import { adminApi } from './auth'
import type { Publication, PublicationInput, PublicationType } from '../types/publications'
const base = '/admin/publications'
export const listPublications = (type: PublicationType, page: number) => adminApi<{items: Publication[]; pagination: {total: number; totalPages: number}}>(`${base}?type=${type}&page=${page}`)
export const savePublication = (data: PublicationInput, id?: string) => adminApi<{publication: {id: string}}>(id ? `${base}/${id}` : base, {method: id ? 'PATCH' : 'POST', body: JSON.stringify(data)})
export const uploadPdf = (id: string, file: File) => { const body = new FormData(); body.append('file', file); return adminApi(`${base}/${id}/file`, {method:'POST',body}) }
export const changeStatus = (id: string, action: 'publish' | 'archive' | 'draft') => adminApi(`${base}/${id}/${action}`, {method:'PATCH'})
export const previewPdf = (id: string) => adminApi<Blob>(`${base}/${id}/file`, {headers:{Accept:'application/pdf'}})
