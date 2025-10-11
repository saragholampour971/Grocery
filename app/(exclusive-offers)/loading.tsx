'use server'
import React from 'react'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import ProductCardFallback from '@/components/shared/ProductCardFallback'

const ExclusiveOffersFallback = () => {
  return (
    <div className={'space-y-5 mt-[30px]'}>
      <h3 className={'px-app-padding font-semibold'}>Exclusive Offer</h3>
      <Carousel>
        <CarouselContent className={'pl-app-padding mr-app-padding gap-x-3'}>
          {Array.from({ length: 4 })?.map((node, index) => (
            <ProductCardFallback key={`exclusive-offers-${index}`} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default ExclusiveOffersFallback
