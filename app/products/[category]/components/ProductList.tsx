"use client";
import React from "react";
import {useMutation, useQuery, useQueryClient,} from "@tanstack/react-query";
import ProductCard from "@/components/shared/ProductCard";
import type {IProduct} from "@/app/api/products/type";
import {cartService} from "../../../../store/cartService";

type Props = {
  products: IProduct[];
};

export function ProductList({products}: Props) {
  const queryClient = useQueryClient();

  const {data: myCart} = useQuery({
    queryKey: ["cart"],
    queryFn: cartService.getCart,
  });
  console.log('my cart', myCart);

  const addMutation = useMutation({
    mutationFn: ({productId, quantity}: { productId: string; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: () => {
      alert('Product Added');
      queryClient.refetchQueries({queryKey: ["cart"]})
    },
  });

  // const removeMutation = useMutation({
  //   mutationFn: ({productId}: { productId: string }) =>
  //     cartService.removeFromCart(productId),
  //   onSuccess: () => queryClient.invalidateQueries({queryKey: ["cart"]}),
  // });

  // const getQuantity = (productId: string) => {
  //   const item = cart?.find(i => i.productId === productId);
  //   return item?.quantity || 0;
  // };

  return (
    <div className={'flex items-start justify-between gap-3.5 px-app-padding flex-wrap'}>

      {products.map(product => (
        <ProductCard
          key={`product-${product.id}`}
          product={product}
          quantity={myCart?.data?.find(node => node.productId == product?.id)?.quantity}
          // onAdd={p => addMutation.mutate({productId: p.id, quantity: 1})}
          // onRemove={p => removeMutation.mutate({ productId: p.id })}
        />
      ))}
    </div>
  );
}
