import {ProductResponse} from "../app/api/products/type";

export const productsService = {
  async getProductsByCategoryId(categoryId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${categoryId}`,
      {next: {revalidate: 60}})
    const data: ProductResponse = await res.json()
    return data
  }
}
