import { ApiResponse } from '@/lib/globalTypes'
import { IProduct } from '../products/type'

export type ExclusiveOffersResponse = ApiResponse<IProduct[]>
