import { adminApi } from './auth'

export type EditorialImageKind = 'committee' | 'articles'

interface UploadImageResponse {
  success: boolean
  imageKey: string
  size: number
  mimeType: string
}

export function uploadEditorialImage(
  kind: EditorialImageKind,
  id: string,
  file: File,
) {
  const data = new FormData()

  data.append('image', file)

  return adminApi<UploadImageResponse>(
    `/admin/${kind}/${id}/image`,
    {
      method: 'POST',
      body: data,
    },
  )
}

export function getPublicImageUrl(
  kind: EditorialImageKind,
  id: string,
) {
  const baseUrl = (
    import.meta.env.VITE_API_URL || '/api'
  ).replace(/\/$/, '')

  return `${baseUrl}/${kind}/${id}/image`
}