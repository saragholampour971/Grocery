import {ApiResponse} from "@/lib/globalTypes";

export type Banner = {
  id: number,
  imageUrl: string,
}

export type BannerResponse = ApiResponse<Banner[]>
