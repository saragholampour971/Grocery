import {NextResponse} from "next/server";
import {getCurrentUser} from "@/lib/serverAuth";
import {User} from "../type";
import {ApiResponse} from "@/lib/globalTypes";

export async function GET(): Promise<ApiResponse<User>> {
  const user = await getCurrentUser()
  console.log('meeee', user)
  if (!user) {
    return NextResponse.json({status: 200, data: "No user found"});
  }
  return NextResponse.json(user);

}
