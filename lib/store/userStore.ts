import { create } from 'zustand'
import { Me } from '@grocery-repo/schemas'

type UserStore = Me & {
  setUser: (user: Me) => void
}

const useUserStore = create<UserStore>((set) => ({
  uid: null,
  email: null,

  setUser: (user) => set({ uid: user.uid, email: user.email }),
}))

export default useUserStore
