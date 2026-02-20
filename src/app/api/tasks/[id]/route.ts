import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const body = await request.json();  
  const task = await prisma.task.update({  
    where: { id: params.id },  
    data: body  
  });  
  return NextResponse.json(task);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  await prisma.task.delete({  
    where: { id: params.id }  
  });  
  return NextResponse.json({ success: true });  
}