import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/app') {
    return NextResponse.redirect(new URL('/app/chat', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
