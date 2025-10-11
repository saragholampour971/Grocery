'use client'
import { PropsWithChildren, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useUserStore from '@/lib/store/userStore'
import { authService } from '@/service/authService'

export default function LoggedInUserProvider(props: PropsWithChildren) {
  const setUser = useUserStore((st) => st.setUser)
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: authService.me,
    staleTime: Infinity,
  })
  useEffect(() => {
    if (data) {
      setUser(data.data)
      const cart = queryClient.getQueryData(['cart'])
      console.log(cart, 'cart is')
    }
  }, [data, setUser])

  return <>{props.children}</>
}
