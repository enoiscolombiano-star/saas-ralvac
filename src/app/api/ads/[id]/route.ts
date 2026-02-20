import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params; // AWAIT aqui!  
    
  const ad = await prisma.ad.findUnique({  
    where: { id },  
    include: {  
      task: true,  
      metrics: true  
    }  
  });  
  
  if (!ad) {  
    return NextResponse.json({ error: 'Anúncio não encontrado' }, { status: 404 });  
  }  
  
  return NextResponse.json(ad);  
}  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params; // AWAIT aqui!  
  const body = await request.json();  
  
  const ad = await prisma.ad.update({  
    where: { id },  
    data: body  
  });  
  
  return NextResponse.json(ad);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: Promise<{ id: string }> }  
) {  
  const { id } = await params; // AWAIT aqui!  
  
  await prisma.ad.delete({  
    where: { id }  
  });  
  
  return NextResponse.json({ success: true });  
}