import { verifyAuth } from "./lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("USER_LOGIN")?.value;
  console.log(token, "token");
  // if(token){
  //   JSON.parse(token).bcry

  // }
  const verifiedToken =
    token &&
    (await verifyAuth(token.replace('"', "")).catch((err: any) => {
    }));
    console.log(verifiedToken,'verifiedToken')
  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {

    return  NextResponse.next();
  }

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login",'/create-user','/admin-template','/role','/type','/account-info'],
};
