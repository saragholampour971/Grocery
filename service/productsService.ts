import { ProductResponse } from '../app/api/products/type'
import { ExclusiveOffersResponse } from '../app/api/exclusive-offers/type'

export const productsService = {
  async getProductsByCategoryId(categoryId: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${categoryId}`,
      { next: { revalidate: 60 } }
    )
    const data: ProductResponse = await res.json()
    return data
  },

  async getExclusiveOffers(): Promise<ExclusiveOffersResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/exclusive-offers`,
      {
        next: { revalidate: 60 },
      }
    )
    return await res.json()
  },
}
