import { ApiResponse } from '../../../lib/globalTypes'

export type Category = {
  id: string
  imageUrl: string
  title: string
}

export type CategoryResponse = ApiResponse<Category[]>
