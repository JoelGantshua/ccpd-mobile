export interface AdminUser {
  id: string
  fullName: string
  role: string
  provinceId: string | null
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse extends AuthTokens {
  user: AdminUser
}