export interface ErrorResponse {
  error?: string
  status?: number
}

export type ApiResponse<T> = { data?: T } & ErrorResponse
