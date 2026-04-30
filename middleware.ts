import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Check for Supabase session cookie (format: sb-<project-ref>-auth-token)
  const projectRef = 'epibdwbrnxwmzxxfjpte'
  const sessionCookie =
    request.cookies.get(`sb-${projectRef}-auth-token`) ||
    request.cookies.get(`sb-${projectRef}-auth-token.0`) ||
    request.cookies.get('supabase-auth-token')

  const hasSession = !!sessionCookie

  if (pathname === '/admin') {
    if (hasSession) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
