import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const ad = await prisma.ad.findUnique({  
    where: { id: params.id },  
    include: {  
      task: true,  
      metrics: true  // CORRIGIDO: era 'metricas'  
    }  
  });  
  
  if (!ad) {  
    return NextResponse.json({ error: 'Anúncio não encontrado' }, { status: 404 });  
  }  
  
  return NextResponse.json(ad);  
}  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const body = await request.json();  
  
  const ad = await prisma.ad.update({  
    where: { id: params.id },  
    data: body  
  });  
  
  return NextResponse.json(ad);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  await prisma.ad.delete({  
    where: { id: params.id }  
  });  
  
  return NextResponse.json({ success: true });  
}