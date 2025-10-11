'use client'
import { useQuery } from '@tanstack/react-query'
import ProductCard from '@/components/shared/ProductCard'
import CustomHeader from '@/components/shared/CustomHeader'
import CustomBody from '@/components/shared/CustomBody'
import NoData from './no-data'
import { cartService } from '@/service/cartService'
import ProductsFallback from '../products/[category]/loading'
import TotalRow from './total'

export default function Cart() {
  const { data: cartValue, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
  if (isLoading)
    return (
      <>
        <CustomHeader>
          <h4 className={'font-bold'}>My Cart</h4>
        </CustomHeader>
        <ProductsFallback />
      </>
    )

  return (
    <>
      <CustomHeader>
        <h4 className={'font-bold'}>My Cart</h4>
      </CustomHeader>
      <CustomBody className={'px-app-padding'}>
        {!cartValue?.data || !cartValue.data.length ? (
          <NoData />
        ) : (
          <div className={'flex items-start gap-4 space-4 flex-wrap'}>
            {cartValue?.data?.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}
      </CustomBody>
      <TotalRow />
    </>
  )
}
