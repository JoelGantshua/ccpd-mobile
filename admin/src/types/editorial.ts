export type EditorialStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED'

export type ArticleCategory =
  | 'POLITIQUE'
  | 'ECONOMIE'

export interface Province {
  id: string
  name: string
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ListResponse<T> {
  success: boolean
  items: T[]
  pagination: Pagination
}

export interface CommitteeMember {
  id: string
  fullName: string
  position: string
  biography: string | null
  provinceId: string | null
  province?: Province | null
  displayOrder: number
  photoKey: string | null
  status: EditorialStatus
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface CommitteeInput {
  fullName: string
  position: string
  biography: string | null
  provinceId: string | null
  displayOrder: number
}

export interface Article {
  id: string
  title: string
  summary: string
  content?: string
  category: ArticleCategory
  coverImageKey: string | null
  status: EditorialStatus
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface ArticleInput {
  title: string
  summary: string
  content: string
  category: ArticleCategory
}

export type EditorialAction =
  | 'publish'
  | 'archive'
  | 'draft'