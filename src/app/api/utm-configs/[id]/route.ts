import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const body = await request.json();  
    
  const utmConfig = await prisma.uTMConfig.update({  
    where: { id: params.id },  
    data: body,  
    include: { task: true }  
  });  
    
  return NextResponse.json(utmConfig);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  await prisma.uTMConfig.delete({  
    where: { id: params.id }  
  });  
    
  return NextResponse.json({ success: true });  
}