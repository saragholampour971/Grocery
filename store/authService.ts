import {auth} from "@/lib/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

async function setTokenCookie(token: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({token: token}),
  });
}

export const authService = {
  async login(email: string, password: string) {
    const {user} = await signInWithEmailAndPassword(auth, email, password);
    const token = await auth.currentUser?.getIdToken();
    console.log('this is token1', token)
    if (token) {

      await setTokenCookie(token);
    }

    return user;
  },

  async signup(email: string, password: string) {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();
    await setTokenCookie(token);
    return user;
  },

  async logout() {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/logout`, {method: "POST"});
  },
  async me() {
    return await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/me`);

  }
};
