"use server"
import {cookies} from "next/headers";
import {adminAuth} from "./firebaseAdmin";
import {QueryClient} from "@tanstack/react-query";

// validate token and return user data
export async function getCurrentUser() {
  try {
    const token = cookies().get("token")?.value;
    if (!token)
      return null

    console.log('i have token')
    const decoded = await adminAuth.verifyIdToken(token);
    console.log('decoded token', decoded);
    return {uid: decoded.uid, email: decoded.email};
  } catch (er) {
    console.log(er, 'ereeeee');

    return null

  }
}

export async function prefillUser(queryClient: QueryClient) {
  const user = await getCurrentUser();
  queryClient.setQueryData(["user"], user);
}
