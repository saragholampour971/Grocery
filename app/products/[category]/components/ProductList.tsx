'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import ProductCard from '@/components/shared/ProductCard'
import type { ProductType } from '@grocery-repo/schemas'
import { cartService } from '@/service/cartService'

type Props = {
  products: ProductType[]
}

export function ProductList({ products }: Props) {
  const { data: myCart } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
  })

  return (
    <div
      className={
        'flex items-start justify-between gap-3.5 px-app-padding flex-wrap'
      }
    >
      {products.map((product) => (
        <ProductCard
          key={`product-${product.id}`}
          product={product}
          quantity={
            myCart?.data?.find((node) => node.productId == product?.id)
              ?.quantity
          }
        />
      ))}
    </div>
  )
}
