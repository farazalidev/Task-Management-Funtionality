import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ["/workspaces", "/myworkspaces", "/user/reports","/myworkspaces/reporte"]

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("accessToken",accessToken);
  
  const currentPath = request.nextUrl.pathname;
  console.log(currentPath);
  

  if (!accessToken && protectedRoutes.includes(currentPath)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

}

export const config = {
  matcher: ['/', '/workspaces/:path*', "/myworkspaces/:path*", "/user/reports/:path*"]

}