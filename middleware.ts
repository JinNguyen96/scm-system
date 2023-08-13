import { encodeToken } from './middleware/auth';
import { verifyAuth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import * as jose from 'jose'
export async function middleware(req: NextRequest, res: NextApiResponse) {
  const token = req.cookies.get("USER_LOGIN")?.value;


  // const verifiedToken =
  //   token && (await verifyAuth(token.replace('"', "")).catch((err: any) => {}));
  const verifiedToken = token && jose.decodeJwt(token)


  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {

    return NextResponse.next();

  }


  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login", '/create-user', '/user-management/:path*', '/role', '/type', '/account-info', "/material/:path*", "/get-info/:path*"]
};