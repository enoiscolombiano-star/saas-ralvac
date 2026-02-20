import { NextRequest, NextResponse } from 'next/server';  
import { verifySession } from '@/lib/auth/session';  
  
export async function middleware(request: NextRequest) {  
  const token = request.cookies.get('session')?.value;  
  
  // Rotas públicas que não precisam de autenticação  
  const publicPaths = ['/login', '/'];  
  const isPublicPath = publicPaths.some(path =>   
    request.nextUrl.pathname.startsWith(path)  
  );  
  
  if (isPublicPath) {  
    return NextResponse.next();  
  }  
  
  // Verificar sessão  
  if (!token) {  
    return NextResponse.redirect(new URL('/login', request.url));  
  }  
  
  const session = await verifySession(token);  
  if (!session) {  
    const response = NextResponse.redirect(new URL('/login', request.url));  
    response.cookies.delete('session');  
    return response;  
  }  
  
  // Adicionar informações do usuário aos headers  
  const response = NextResponse.next();  
  response.headers.set('x-user-id', session.userId);  
  response.headers.set('x-user-role', session.user.role);  
  
  return response;  
}  
  
export const config = {  
  matcher: [  
    '/kanban/:path*',  
    '/definicoes/:path*',  
    '/webhooks/:path*',  
    '/veicular/:path*',  
    '/dashboard/:path*',  
    '/perfil/:path*',  
    '/api/:path*'  
  ]  
};