import { IProduct } from '../products/type'
import { ApiResponse } from '@/lib/globalTypes'

export interface IPostParams {
  productId: string
  quantity: number
}

export type ICartItem = IProduct & IPostParams
export type CartResponse = ApiResponse<ICartItem[]>
