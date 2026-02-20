import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const user = await prisma.user.findUnique({  
    where: { id },  
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
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const body = await request.json();  
  
  const user = await prisma.user.update({  
    where: { id },  
    data: body  
  });  
  
  return NextResponse.json(user);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  await prisma.user.delete({  
    where: { id }  
  });  
  
  return NextResponse.json({ success: true });  
}