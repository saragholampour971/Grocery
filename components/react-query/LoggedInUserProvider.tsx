'use client'
import { PropsWithChildren, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import useUserStore from '@/lib/store/userStore'
import { authService } from '@/service/authService'

export default function LoggedInUserProvider(props: PropsWithChildren) {
  const setUser = useUserStore((st) => st.setUser)
  console.log('LoggedInUserProvider')
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: authService.me,
    staleTime: Infinity,
  })
  useEffect(() => {
    if (data) {
      setUser(data.data)
    }
  }, [data, setUser])

  return <>{props.children}</>
}
