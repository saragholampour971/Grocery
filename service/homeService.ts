import { BannerResponseType } from '@grocery-repo/schemas'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const homeService = {
  async getBanners(): Promise<BannerResponseType> {
    return await fetchWithAuth(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/banner`,
      {
        next: { revalidate: 60 },
      }
    )
  },
}
