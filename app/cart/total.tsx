'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { cartService } from '@/service/cartService'
import { price } from '@/lib/utils'

const TotalRow = () => {
  const [totalPrice, setTotalPrice] = React.useState<number>(0)
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    enabled: false,
  })
  useEffect(() => {
    if (data?.data?.length) {
      setTotalPrice(
        data.data.reduce((sum, item) => sum + item.quantity * item.price, 0)
      )
    }
  }, [data])

  return (
    <div className="fixed left-0 right-0 bottom-mobile-navbar-height shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] !rounded-t-xl bg-black/80 text-white py-3 px-app-padding flex justify-between">
      <span>total : </span>
      <span>{price(totalPrice)}</span>
    </div>
  )
}

export default TotalRow
