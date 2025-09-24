import React from 'react';
import {Card} from "../ui/card";
import {Skeleton} from "../ui/skeleton";

const ProductCardFallback = () => {
  return (
    <Card
      className={'w-[173px] max-w-[173px] h-[249px] !min-h-[249px] flex flex-col items-stretch'}>
      <Skeleton className={'mx-auto w-[90px] h-[90px] rounded-full mt-4'}/>

      <Skeleton className={'w-full h-4 my-3'}/>
      <Skeleton className={'w-full h-3'}/>
    </Card>
  );
};

export default ProductCardFallback;
