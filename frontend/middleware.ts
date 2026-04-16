// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Jika user SUDAH login dan mencoba akses login/register, 
  // lempar ke dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 2. Jika user BELUM login dan mencoba akses halaman terproteksi (dashboard), 
  // lempar ke login
  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
} 

// Tentukan halaman mana saja yang akan diawasi oleh middleware
export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};