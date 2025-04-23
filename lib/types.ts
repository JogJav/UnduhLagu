export interface VideoItem {
  splash_img: string
  size: string
  last_view: string
  title: string
  views: string
  filecode: string
  file_code: string
  protected_dl: string
  canplay: number
  length: string
  single_img: string
  protected_embed: string
  uploaded: string
  status: number
  description?: string
}

export interface ApiResponse {
  status: number
  result: VideoItem[]
  server_time: string
  msg: string
  total?: number
  page?: number
  per_page?: number
}

// Add additional interfaces for better type safety

export interface SearchParams {
  q?: string
  page?: string
  per_page?: string
}

export interface VideoParams {
  id: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
