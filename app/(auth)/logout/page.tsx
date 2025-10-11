'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { authService } from '@/service/authService'

export default function LogoutPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    const logout = async () => {
      try {
        await authService.logout()

        queryClient.clear()

        router.replace('/')
        router.refresh()
      } catch (err) {
        console.error('Logout failed:', err)
      }
    }

    logout()
  }, [queryClient, router])

  return <div>Logging out...</div>
}
