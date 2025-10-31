import { auth } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { LoginSchema, MeSchema, VoidSchema } from '@grocery-repo/schemas'
import useUserStore from '@/lib/store/userStore'
import { fetchApi } from '@/lib/fetchApi'

async function setTokenCookie(token: string) {
  return await fetchApi(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/login`,
    LoginSchema,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    }
  )
}

export const authService = {
  async login(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const token = await auth.currentUser?.getIdToken()
    if (token) {
      await setTokenCookie(token).then(() => {
        useUserStore.setState({ uid: user.uid, email: user.email })
      })
    }

    return user
  },

  async signup(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const token = await user.getIdToken()
    await setTokenCookie(token)
    return user
  },

  async logout() {
    await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/logout`,
      VoidSchema,
      {
        method: 'POST',
      }
    )
  },
  async me() {
    return await fetchApi(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/me`,
      MeSchema
    )
  },
}
