'use client'
import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image'
import { price } from '@/lib/utils'
import AddButton from './AddButton'
import {
  CartItemType,
  CartSchema,
  ProductType,
  SuccessResponseType,
} from '@grocery-repo/schemas'
import MinusButton from './MinusButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartService } from '@/service/cartService'
import Loading from '@/public/svg/loading'

type Props = {
  product: ProductType
  quantity?: number
}
const ProductCard = (props: Props) => {
  const { product, quantity } = props
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (prp: { productId: string; quantity: number }) => {
      return cartService.addToCart({
        productId: prp.productId,
        quantity: prp.quantity,
      })
    },
    onMutate: async (variables: { productId: string; quantity: number }) => {
      const lastCart = queryClient.getQueryData<
        SuccessResponseType<typeof CartSchema>
      >(['cart'])
      // Optimistic update
      queryClient.setQueryData<SuccessResponseType<typeof CartSchema>>(
        ['cart'],
        (prev) => {
          const copy = [...(prev?.data || [])]
          const index = copy.findIndex(
            (node) => node.productId === variables.productId
          )

          if (index > -1) {
            if (variables.quantity > 0) {
              //TODO: fix it
              copy[index] = {
                ...copy[index],
              } as CartItemType
            } else {
              copy.splice(index, 1)
            }
          }

          return { data: copy }
        }
      )

      return { lastCart }
    },

    onSettled: (data, error, variables, onMutateResult) => {
      if (onMutateResult?.lastCart && error) {
        alert(1)
        queryClient.setQueryData(['cart'], onMutateResult?.lastCart)
        queryClient.invalidateQueries({ queryKey: ['cart'] }).then()
      }
      // if new product added to cart we need to reFetch cart to
      // join cart with product table and get all field of that product in cart
      else if (variables.quantity == 1 && !quantity) {
        alert(2)
        queryClient.invalidateQueries({ queryKey: ['cart'] }).then()
      }
    },
  })

  const onIncrease = () => {
    addMutation.mutate({ productId: product.id, quantity: (quantity || 0) + 1 })
  }
  const onDecrease = () => {
    if (Number(quantity || 0) > 0) {
      addMutation.mutate({
        productId: product.id,
        quantity: (quantity || 0) - 1,
      })
    }
  }

  return (
    <Card
      className={
        'w-[173px] max-w-[173px] h-[249px] !min-h-[249px] flex flex-col shrink-0 items-stretch '
      }
    >
      <div className={'relative w-[90%] h-[80px] mx-auto'}>
        <Image
          loading={'lazy'}
          src={product.imageUrl}
          alt={product.imageUrl}
          fill
          className={'p-2 object-contain object-center'}
        />
      </div>

      <CardTitle className={'!text-[15px] pb-1 pt-3 text-wrap leading-5'}>
        {product.title}
      </CardTitle>
      <CardDescription className={'self-stretch flex-1'}>
        {product.description}
      </CardDescription>
      <p className={'font-semibold mt-3'}>{price(product.price)}</p>
      <div className={'h-[46px] place-content-end self-end'}>
        {quantity ? (
          <div className={'flex items-center  w-full gap-x-3 '}>
            <AddButton
              variant={'outline'}
              className={'!w-[25px] !h-[25px] !rounded-md'}
              onClick={onIncrease}
            />
            {addMutation.status == 'pending' ? <Loading /> : quantity}
            <MinusButton
              className={'!w-[25px] !h-[25px] !rounded-md'}
              variant={'outline'}
              onClick={onDecrease}
            />
          </div>
        ) : (
          <AddButton
            className={'ml-auto'}
            onClick={() =>
              addMutation.mutate({ productId: product?.id, quantity: 1 })
            }
          />
        )}
      </div>
    </Card>
  )
}

export default ProductCard
