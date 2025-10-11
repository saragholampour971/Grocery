import { ApiResponse } from '@/lib/globalTypes'

export interface IProduct {
  id: string
  categoryId?: string
  categoryName?: string
  title: string
  imageUrl: string
  price: number
  description: string
}

export type ProductResponse = ApiResponse<IProduct[]>
