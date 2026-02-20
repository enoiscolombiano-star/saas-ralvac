import { NextRequest, NextResponse } from 'next/server';  
import { verifySession } from '@/lib/auth/session';  
  
export async function middleware(request: NextRequest) {  
  const token = request.cookies.get('session')?.value;  
  
  const publicPaths = ['/login', '/'];  
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);  
  
  if (!token && !isPublicPath) {  
    return NextResponse.redirect(new URL('/login', request.url));  
  }  
  
  if (token) {  
    const session = await verifySession(token);  // CORRIGIDO: retorna objeto ou null  
  
    if (!session) {  
      const response = NextResponse.redirect(new URL('/login', request.url));  
      response.cookies.delete('session');  
      return response;  
    }  
  
    // CORRIGIDO: agora session é um objeto, não 'true'  
    const requestHeaders = new Headers(request.headers);  
    requestHeaders.set('x-user-id', session.userId);  
    requestHeaders.set('x-user-role', session.user.role);  
  
    return NextResponse.next({  
      request: {  
        headers: requestHeaders  
      }  
    });  
  }  
  
  return NextResponse.next();  
}  
  
export const config = {  
  matcher: [  
    '/((?!api|_next/static|_next/image|favicon.ico).*)',  
  ],  
};