"use client"
import React from 'react';
import {Carousel, CarouselContent, CarouselItem,} from "@/components/ui/carousel"
import {ExclusiveOfferInfo} from "../api/exclusive-offers/type";
import {Card, CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import AddButton from "@/components/shared/AddButton";
import Image from "next/image";
import {price} from "../../lib/utils";

type Props = {
  data?: ExclusiveOfferInfo[]
}

const ExclusiveOffersList = (props: Props) => {
  return (
    <Carousel>
      <CarouselContent className={'pl-app-padding mr-app-padding'}>
        {props?.data?.map((node, index) =>
          <CarouselItem
            key={`exclusive-offers-${index}`}
            className={'w-[173px] max-w-[173px] h-[249px] !min-h-[249px]'}
          >
            <Card className={' w-full h-full flex flex-col items-stretch '}>
              <div className={'relative w-[90%] h-[100px] mx-auto'}>
                <Image
                  src={node.imageUrl}
                  alt={node.imageUrl}
                  fill
                  loading={'lazy'}
                  className={'p-2 object-contain object-center'}
                />

              </div>

              <CardTitle className={'!text-[15px] pb-1 pt-3 text-wrap leading-5'}>
                {node.title}
              </CardTitle>
              <CardDescription>{node.description}</CardDescription>
              <CardFooter
                className={'!p-0 flex !h-content items-center justify-between mt-auto'}>
                <p className={'font-semibold'}>{price(node.price)}</p>
                <AddButton/>
              </CardFooter>
            </Card>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default ExclusiveOffersList;
