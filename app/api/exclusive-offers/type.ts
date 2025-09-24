import {ApiResponse} from "../../../lib/globalTypes";

export type ExclusiveOfferInfo = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  description: string,
  category: string,

}

export type ExclusiveOffersResponse = ApiResponse<ExclusiveOfferInfo[]>
