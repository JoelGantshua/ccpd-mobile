const API_URL = import.meta.env.VITE_API_URL || '/api'

export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers = new Headers(options.headers)

  if (!headers.has('Accept')) headers.set('Accept', 'application/json')

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!response.ok) {
      const messages: Record<number, string> = {
        400: 'Requete invalide.',
        401: 'Identifiants invalides ou session expiree.',
        403: 'Acces non autorise.',
        404: 'Ressource introuvable.',
        409: 'Conflit avec les donnees existantes.',
        413: 'Fichier trop volumineux.',
        429: 'Trop de tentatives. Veuillez patienter.',
      }

      throw new ApiError(
        messages[response.status] ||
          'Une erreur serveur est survenue.',
        response.status,
      )
    }

    if (response.status === 204) {
      return undefined as T
    }

    if (headers.get('Accept') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      if (!response.headers.get('Content-Type')?.toLowerCase().startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) throw new ApiError('Classeur invalide.', 502)
      return await response.blob() as T
    }
    if (headers.get('Accept') === 'application/pdf') {
      if (!response.headers.get('Content-Type')?.toLowerCase().startsWith('application/pdf')) throw new ApiError('PDF invalide.', 502)
      return await response.blob() as T
    }
    return await response.json() as T
  } catch (error) {
    if (error instanceof ApiError) throw error

    throw new ApiError(
      'Impossible de communiquer avec le serveur.',
      0,
    )
  } finally {
    clearTimeout(timeout)
  }
}