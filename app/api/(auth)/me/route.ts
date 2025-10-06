import {NextResponse} from "next/server";
import {getCurrentUser} from "../../../../lib/serverAuth";

export async function GET() {
  const user = getCurrentUser()
  if (!user) {
    return NextResponse.json({status: 200, data: "No user found"});
  }
  return NextResponse.json(user);

}
