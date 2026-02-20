import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
import { verifyPassword } from '@/lib/auth/password';  
import { createSession } from '@/lib/auth/session';  
  
const prisma = new PrismaClient();  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  const { email, senha } = body;  
  
  // Buscar usuário  
  const user = await prisma.user.findUnique({  
    where: { email }  
  });  
  
  if (!user || !user.ativo) {  
    return NextResponse.json(  
      { error: 'Credenciais inválidas' },  
      { status: 401 }  
    );  
  }  
  
  // Verificar senha  
  const isValid = await verifyPassword(senha, user.senha);  
  if (!isValid) {  
    return NextResponse.json(  
      { error: 'Credenciais inválidas' },  
      { status: 401 }  
    );  
  }  
  
  // Criar sessão  
  const token = await createSession(user.id);  
  
  // Retornar com cookie  
  const response = NextResponse.json({  
    user: {  
      id: user.id,  
      nome: user.nome,  
      email: user.email,  
      role: user.role  
    }  
  });  
  
  response.cookies.set('session', token, {  
    httpOnly: true,  
    secure: process.env.NODE_ENV === 'production',  
    sameSite: 'lax',  
    maxAge: 7 * 24 * 60 * 60 // 7 dias  
  });  
  
  return response;  
}