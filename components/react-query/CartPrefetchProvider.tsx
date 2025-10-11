'use client'

import { ReactNode, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useUserStore from '@/lib/store/userStore'
import { cartService } from '@/service/cartService'

interface CartPrefetchProviderProps {
  children: ReactNode
}

export function CartPrefetchProvider({ children }: CartPrefetchProviderProps) {
  const queryClient = useQueryClient()
  const userId = useUserStore((st) => st.uid)
  useEffect(() => {
    const prefetchCart = async () => {
      if (userId) {
        try {
          await queryClient.fetchQuery({
            queryKey: ['cart'],
            queryFn: cartService.getCart,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    prefetchCart() // تابع را اجرا می‌کنیم
  }, [userId, queryClient]) // با تغییر userId دوباره اجرا می‌شود

  return <>{children}</>
}
