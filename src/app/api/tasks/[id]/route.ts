import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  
  const task = await prisma.task.findUnique({  
    where: { id }  
  });  
  
  if (!task) {  
    return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });  
  }  
  
  return NextResponse.json(task);  
}  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  const body = await request.json();  
  
  const task = await prisma.task.update({  
    where: { id },  
    data: body  
  });  
  
  return NextResponse.json(task);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  
  await prisma.task.delete({  
    where: { id }  
  });  
  
  return NextResponse.json({ success: true });  
}