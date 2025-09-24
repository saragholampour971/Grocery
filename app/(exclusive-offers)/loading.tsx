"use server"
import React from 'react';
import {Carousel, CarouselContent} from "@/components/ui/carousel";
import ProductCardFallback from "@/components/shared/ProductCardFallback";

const ExclusiveOffersFallback = () => {
  return (
    <Carousel>
      <CarouselContent className={'pl-app-padding mr-app-padding'}>
        {Array.from({length: 3})?.map((node, index) =>
          <ProductCardFallback key={`exclusive-offers-${index}`}/>
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default ExclusiveOffersFallback;
