import { fetchApi } from '@/lib/fetchApi'
import { BannersSchema } from '@grocery-repo/schemas'

export const homeService = {
  async getBanners() {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/banner`,
      BannersSchema,
      {
        next: { revalidate: 60 },
      }
    )
  },
}
