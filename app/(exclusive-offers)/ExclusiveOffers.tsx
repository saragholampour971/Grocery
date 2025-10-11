import React from 'react'
import dynamic from 'next/dynamic'
import ExclusiveOffersFallback from './loading'
import { productsService } from '@/service/productsService'

const ExclusiveOffersList = dynamic(() => import('./ExclusiveOffersList'), {
  loading: ExclusiveOffersFallback,
  ssr: true,
})

export default async function ExclusiveOffers() {
  const data = await productsService.getExclusiveOffers()

  return (
    <div className={'space-y-5 mt-[30px]'}>
      <h3 className={'px-app-padding font-semibold'}>Exclusive Offer</h3>
      <ExclusiveOffersList products={data?.data} />
    </div>
  )
}
