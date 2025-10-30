import {
  CategoryResponse,
  ExclusiveOffersResponseType,
  ProductsResponseType,
} from '@grocery-repo/schemas'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const productsService = {
  async getProductsByCategoryId(categoryId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${categoryId}`,
      { next: { revalidate: 60 } }
    )
    const data: ProductsResponseType = await res.json()
    return data
  },

  async getExclusiveOffers(): Promise<ExclusiveOffersResponseType> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/exclusive-offers`,
      {
        next: { revalidate: 60 },
      }
    )
    return await res.json()
  },
  async getCategories(): Promise<CategoryResponse> {
    return await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/category`,
      {
        cache: 'force-cache',
      }
    )
  },
}
