"use client"
import React from 'react';
import {Card, CardDescription, CardTitle} from "../ui/card";
import Image from "next/image";
import {price} from "@/lib/utils";
import AddButton from "./AddButton";
import {IProduct} from "@/app/api/products/type";
import MinusButton from "./MinusButton";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {cartService} from "@/service/cartService";
import {CartResponse} from "@/app/api/cart/type";

type Props = {
  product: IProduct;
  quantity?: number;
}
const ProductCard = (props: Props) => {

  const {product, quantity} = props;
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (prp: { productId: string, quantity: number }) => {
      return cartService.addToCart(prp.productId, prp.quantity);
    },
    onMutate: async (variables: { productId: string; quantity: number }) => {

      const lastCart = queryClient.getQueryData<CartResponse>(['cart']);

      // Optimistic update
      queryClient.setQueryData<CartResponse>(['cart'], (prev) => {
        const copy = [...(prev?.data || [])];  // کپی از آرایه
        const index = copy.findIndex((node) => node.productId === variables.productId);  // === بهتره

        if (index > -1) {
          if (variables.quantity > 0) {
            copy[index] = {...copy[index], quantity: variables.quantity};
          } else {
            copy.splice(index, 1);
          }
        }

        return {data: copy};
      });

      return {lastCart};  // context برای rollback
    },


    onSettled: (data, error, variables, onMutateResult, context) => {
      if (onMutateResult?.lastCart && error) {
        queryClient.setQueryData(['cart'], onMutateResult?.lastCart);
        queryClient.invalidateQueries({queryKey: ['cart']});
      }
      // if new product added to cart we need to reFetch cart to
      // join cart with product table and get all field of that product in cart
      if ((variables.quantity == 1 && !quantity)) {
        queryClient.invalidateQueries({queryKey: ['cart']});

      }
    },
  });

  const onIncrease = () => {
    addMutation.mutate({productId: product.id, quantity: (quantity || 0) + 1})
  }
  const onDecrease = () => {
    if (Number(quantity || 0) > 0) {
      addMutation.mutate({productId: product.id, quantity: (quantity || 0) - 1})
    }
  }

  return (
    <Card className={'w-[173px] max-w-[173px] h-[249px] !min-h-[249px] flex flex-col shrink-0 items-stretch '}>
      <div className={'relative w-[90%] h-[100px] mx-auto'}>
        <Image src={product.imageUrl} alt={product.imageUrl} fill className={'p-2 object-contain object-center'}/>
      </div>

      <CardTitle className={'!text-[15px] pb-1 pt-3 text-wrap leading-5'}>
        {product.title}
      </CardTitle>
      <CardDescription className={'self-stretch flex-1'}>{product.description}</CardDescription>
      <p className={'font-semibold mb-1'}>{price(product.price)}</p>
      {quantity ?
        <div className={'flex items-center justify-end w-full gap-x-3 '}>
          <AddButton
            variant={'outline'}
            className={'!w-[25px] !h-[25px] !rounded-md'}
            onClick={onIncrease}
          />
          {addMutation.status == "pending" ?
            <svg aria-hidden="true" className="size-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"/>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"/>
            </svg>
            : quantity}
          <MinusButton
            className={'!w-[25px] !h-[25px] !rounded-md'}
            variant={'outline'}
            onClick={onDecrease}
          />
        </div> :

        <AddButton
          className={'ml-auto'}
          onClick={() => addMutation.mutate({productId: product?.id, quantity: 1})}
        />
      }
    </Card>

  );
};

export default ProductCard;
