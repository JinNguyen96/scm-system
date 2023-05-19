import { encodeToken } from './middleware/auth';
import { verifyAuth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import * as jose from 'jose'
export async function middleware(req: NextRequest,res:NextApiResponse) {
  const token = req.cookies.get("USER_LOGIN")?.value;
console.log(res,'res.cookie')

  // const verifiedToken =
  //   token && (await verifyAuth(token.replace('"', "")).catch((err: any) => {}));
  const verifiedToken = token && jose.decodeJwt(token)

    console.log( verifiedToken,'verifiedToken')
  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {

    return NextResponse.next();

  }
  console.log(req.url.includes("/login"), 'req.url.includes("/login")');
  console.log(verifiedToken, "verifiedToken");
  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login",'/create-user','/admin-template','/role','/type','/account-info']
};