import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  const body = await request.json();  
  
  const config = await prisma.uTMConfig.update({  
    where: { id },  
    data: body,  
    include: {  
      task: true  
    }  
  });  
  
  return NextResponse.json(config);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params;  
  
  await prisma.uTMConfig.delete({  
    where: { id }  
  });  
  
  return NextResponse.json({ success: true });  
}