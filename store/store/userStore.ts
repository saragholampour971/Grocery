import {create} from 'zustand';
import {User} from "@/app/api/(auth)/type";

type UserStore = User & {
  setUser: (user: User) => void
}

const useUserStore = create<UserStore>((set) => ({
  uid: null,
  email: null,

  setUser: (user) => set({uid: user.uid, email: user.email}),


}));

export default useUserStore;
