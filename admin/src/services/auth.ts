import { api, ApiError } from './api'
import type {
  AdminUser,
  AuthTokens,
  LoginResponse,
} from '../types/auth'

let tokens: AuthTokens | null = null
let generation = 0
let refreshing: Promise<string> | null = null

export function clearSession() {
  generation++
  tokens = null
  refreshing = null
}

export async function login(
  email: string,
  password: string,
): Promise<AdminUser> {
  clearSession()
  const currentGeneration = generation

  const result = await api<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  try {
    const user = await api<AdminUser>(
      '/auth/me',
      {},
      result.accessToken,
    )

    if (user.role !== 'ADMIN') {
      throw new ApiError(
        'Cet espace est reserve aux administrateurs.',
        403,
      )
    }

    if (generation !== currentGeneration) {
      throw new ApiError('Connexion annulee.', 401)
    }

    tokens = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    }

    return user
  } catch (error) {
    try {
      await api('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: result.refreshToken,
        }),
      }, result.accessToken)
    } catch {
      // Ne pas conserver les jetons localement.
    }

    throw error
  }
}

async function refreshAccessToken(): Promise<string> {
  if (refreshing) return refreshing

  if (!tokens) {
    throw new ApiError('Session expiree.', 401)
  }

  const currentGeneration = generation
  const refreshToken = tokens.refreshToken

  const operation = (async () => {
    try {
      const result = await api<AuthTokens>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      })

      if (generation !== currentGeneration) {
        throw new ApiError('Session terminee.', 401)
      }

      tokens = result

      return result.accessToken
    } catch (error) {
      if (
        generation === currentGeneration &&
        error instanceof ApiError &&
        error.status === 401
      ) {
        clearSession()
      }

      throw error
    }
  })()

  refreshing = operation

  try {
    return await operation
  } finally {
    if (refreshing === operation) {
      refreshing = null
    }
  }
}

export async function adminApi<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!tokens) {
    throw new ApiError('Session expiree.', 401)
  }

  const currentGeneration = generation
  const originalToken = tokens.accessToken

  try {
    return await api<T>(path, options, originalToken)
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error
    }

    if (generation !== currentGeneration || !tokens) {
      throw new ApiError('Session expiree.', 401)
    }

    const token = tokens.accessToken !== originalToken
      ? tokens.accessToken
      : await refreshAccessToken()

    if (generation !== currentGeneration) {
      throw new ApiError('Session expiree.', 401)
    }

    return api<T>(path, options, token)
  }
}

export async function logout(): Promise<void> {
  try {
    if (tokens) {
      await adminApi('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: tokens.refreshToken,
        }),
      })
    }
  } finally {
    clearSession()
  }
}