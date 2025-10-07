"use client";
import React from "react";
import {useQuery,} from "@tanstack/react-query";
import ProductCard from "@/components/shared/ProductCard";
import type {IProduct} from "@/app/api/products/type";
import {cartService} from "@/store/cartService";

type Props = {
  products: IProduct[];
};

export function ProductList({products}: Props) {

  const {data: myCart} = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });


  return (
    <div className={'flex items-start justify-between gap-3.5 px-app-padding flex-wrap'}>
      {products.map(product => (
        <ProductCard
          key={`product-${product.id}`}
          product={product}
          quantity={myCart?.data?.find(node => node.productId == product?.id)?.quantity}
        />
      ))}
    </div>
  );
}
