import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
import { hashPassword } from '@/lib/auth/password';  
  
const prisma = new PrismaClient();  
  
export async function GET(request: NextRequest) {  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const users = await prisma.user.findMany({  
    select: {  
      id: true,  
      nome: true,  
      email: true,  
      role: true,  
      ativo: true,  
      criadoEm: true  
    },  
    orderBy: { criadoEm: 'desc' }  
  });  
  
  return NextResponse.json(users);  
}  
  
export async function POST(request: NextRequest) {  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const body = await request.json();  
  const { nome, email, senha, role } = body;  
  
  // Verificar se email já existe  
  const existingUser = await prisma.user.findUnique({  
    where: { email }  
  });  
  
  if (existingUser) {  
    return NextResponse.json(  
      { error: 'Email já cadastrado' },  
      { status: 400 }  
    );  
  }  
  
  // Hash da senha  
  const senhaHash = await hashPassword(senha);  
  
  const user = await prisma.user.create({  
    data: {  
      nome,  
      email,  
      senha: senhaHash,  
      role: role || 'VIEWER'  
    },  
    select: {  
      id: true,  
      nome: true,  
      email: true,  
      role: true,  
      ativo: true,  
      criadoEm: true  
    }  
  });  
  
  return NextResponse.json(user);  
}