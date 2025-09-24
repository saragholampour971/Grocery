"use client"
import React from 'react';
import {Card, CardDescription, CardFooter, CardTitle} from "../ui/card";
import Image from "next/image";
import {price} from "../../lib/utils";
import AddButton from "./AddButton";
import {IProduct} from "../../app/api/products/type";

type Props = {
  product: IProduct;
  quantity?: number;
  onAdd?: (product: IProduct) => void;
}
const ProductCard = (props: Props) => {
  const {product, onAdd, quantity} = props;

  return (
    <Card className={'w-[173px] max-w-[173px] h-[249px] !min-h-[249px] flex flex-col shrink-0 items-stretch '}>
      <div className={'relative w-[90%] h-[100px] mx-auto'}>
        <Image src={product.imageUrl} alt={product.imageUrl} fill className={'p-2 object-contain object-center'}/>
      </div>

      <CardTitle className={'!text-[15px] pb-1 pt-3 text-wrap leading-5'}>
        {product.title}
      </CardTitle>
      <CardDescription>{product.description}</CardDescription>
      <CardFooter
        className={'!p-0 flex !h-content items-center justify-between mt-auto'}>
        <p className={'font-semibold'}>{price(product.price)}</p>
        {quantity ?
          <div className={'flex items-center gap-x-3'}>
            <AddButton className={'!w-[20px] !h-[20px]'}/>
            {quantity}
            <AddButton className={'!w-[20px] !h-[20px]'}/>
          </div> :

          <AddButton onClick={() => onAdd?.(product)}/>
        }
      </CardFooter>
    </Card>

  );
};

export default ProductCard;
