import { ApiResponse } from '@/lib/globalTypes'

export type User = {
  email: string | null
  uid: string | null
}

export type MeResponse = ApiResponse<any>
