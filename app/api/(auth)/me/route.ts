import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/serverAuth'
import { MeResponse } from '../type'

export async function GET(): Promise<NextResponse<MeResponse>> {
  const user = await getCurrentUser()
  console.log('meeee', user)
  if (!user) {
    return NextResponse.json({ status: 200, data: { email: null, uid: null } })
  }
  return NextResponse.json({ data: user })
}
