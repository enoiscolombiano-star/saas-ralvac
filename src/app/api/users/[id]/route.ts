import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
import { hashPassword } from '@/lib/auth/password';  
  
const prisma = new PrismaClient();  
  
export async function GET(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const userRole = request.headers.get('x-user-role');  
  const userId = request.headers.get('x-user-id');  
  
  // Usuários podem ver seu próprio perfil, admins podem ver qualquer um  
  if (userRole !== 'ADMIN' && userId !== params.id) {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const user = await prisma.user.findUnique({  
    where: { id: params.id },  
    select: {  
      id: true,  
      nome: true,  
      email: true,  
      role: true,  
      ativo: true,  
      criadoEm: true  
    }  
  });  
  
  if (!user) {  
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });  
  }  
  
  return NextResponse.json(user);  
}  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const userRole = request.headers.get('x-user-role');  
  const userId = request.headers.get('x-user-id');  
  
  // Usuários podem editar seu próprio perfil, admins podem editar qualquer um  
  if (userRole !== 'ADMIN' && userId !== params.id) {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const body = await request.json();  
  const { nome, email, senha, role, ativo } = body;  
  
  const updateData: any = {};  
  
  if (nome) updateData.nome = nome;  
  if (email) updateData.email = email;  
  if (senha) updateData.senha = await hashPassword(senha);  
  
  // Apenas admins podem alterar role e status ativo  
  if (userRole === 'ADMIN') {  
    if (role) updateData.role = role;  
    if (typeof ativo === 'boolean') updateData.ativo = ativo;  
  }  
  
  const user = await prisma.user.update({  
    where: { id: params.id },  
    data: updateData,  
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
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  await prisma.user.delete({  
    where: { id: params.id }  
  });  
  
  return NextResponse.json({ success: true });  
}