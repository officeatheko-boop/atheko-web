import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || ''
    const isPublicPath = path == '/login'
    if(token && isPublicPath){
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    const isPrivatePath = path == '/admin' || path == '/admin/banner' || path == '/admin/contacts' || path == '/admin/reviews' || path == '/admin/booking' || path == '/admin/service'
    if(!token && isPrivatePath){
        return NextResponse.redirect(new URL('/login', request.url))
    }

}
 
export const config = {
  matcher: ['/login','/admin/:path*'],
}
