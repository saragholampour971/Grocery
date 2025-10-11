'use client'
import React, { useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import ProductCard from '@/components/shared/ProductCard'
import { IProduct } from '../api/products/type'
import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/service/cartService'
import useUserStore from '../../lib/store/userStore'

type Props = {
  products?: IProduct[]
}

const ExclusiveOffersList = (props: Props) => {
  const { uid } = useUserStore()
  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    enabled: !!uid,
  })

  const MapCart = useMemo(() => {
    return new Map(cart?.data?.map((node) => [node.productId, node.quantity]))
  }, [cart?.data])

  const mergedProducts = useMemo(() => {
    return props.products?.map((node) => ({
      ...node,
      cartQuantity: MapCart.get(node.id),
    }))
  }, [props.products, MapCart])

  return (
    <Carousel>
      <CarouselContent className={'pl-app-padding gap-x-3.5 !mr-7'}>
        {mergedProducts?.map((node, index) => (
          <CarouselItem
            key={`exclusive-offers-${index}`}
            className={'w-[173px] max-w-[173px] h-[249px] !min-h-[249px]'}
          >
            <ProductCard product={node} quantity={node.cartQuantity} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ExclusiveOffersList
