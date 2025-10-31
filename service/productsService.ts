import {
  CategoriesSchema,
  ExclusiveOffersSchema,
  ProductsSchema,
} from '@grocery-repo/schemas'
import { fetchApi } from '@/lib/fetchApi'

export const productsService = {
  async getProductsByCategoryId(categoryId: string) {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${categoryId}`,
      ProductsSchema,
      { next: { revalidate: 60 } }
    )
  },

  async getExclusiveOffers() {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/exclusive-offers`,
      ExclusiveOffersSchema,
      {
        next: { revalidate: 60 },
      }
    )
  },
  async getCategories() {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/category`,
      CategoriesSchema,
      {
        cache: 'force-cache',
      }
    )
  },
}
