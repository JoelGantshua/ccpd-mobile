import { adminApi } from './auth'
import { api } from './api'

import type {
  Province,
  CommitteeMember,
  CommitteeInput,
  Article,
  ArticleInput,
  ArticleCategory,
  EditorialAction,
  ListResponse,
} from '../types/editorial'

export async function getProvinces(): Promise<Province[]> {
  const result = await api<
    Province[] | { data?: Province[]; value?: Province[] }
  >('/api/v1/provinces')

  if (Array.isArray(result)) return result
  if (Array.isArray(result.data)) return result.data
  if (Array.isArray(result.value)) return result.value

  throw new Error('Liste des provinces invalide.')
}

export function getCommittee(page = 1) {
  return adminApi<ListResponse<CommitteeMember>>(
    `/admin/committee?page=${page}`,
  )
}

export function getCommitteeMember(id: string) {
  return adminApi<{
    success: boolean
    member: CommitteeMember
  }>(`/admin/committee/${id}`)
}

export function saveCommitteeMember(
  input: CommitteeInput,
  id?: string,
) {
  return adminApi<{
    success: boolean
    member: CommitteeMember
  }>(
    id ? `/admin/committee/${id}` : '/admin/committee',
    {
      method: id ? 'PATCH' : 'POST',
      body: JSON.stringify(input),
    },
  )
}

export function changeCommitteeStatus(
  id: string,
  action: EditorialAction,
) {
  return adminApi(
    `/admin/committee/${id}/${action}`,
    { method: 'PATCH' },
  )
}

export function getArticles(
  category: ArticleCategory,
  page = 1,
) {
  return adminApi<ListResponse<Article>>(
    `/admin/articles?category=${category}&page=${page}`,
  )
}

export function getArticle(id: string) {
  return adminApi<{
    success: boolean
    article: Article
  }>(`/admin/articles/${id}`)
}

export function saveArticle(
  input: ArticleInput,
  id?: string,
) {
  return adminApi<{
    success: boolean
    article: Article
  }>(
    id ? `/admin/articles/${id}` : '/admin/articles',
    {
      method: id ? 'PATCH' : 'POST',
      body: JSON.stringify(input),
    },
  )
}

export function changeArticleStatus(
  id: string,
  action: EditorialAction,
) {
  return adminApi(
    `/admin/articles/${id}/${action}`,
    { method: 'PATCH' },
  )
}