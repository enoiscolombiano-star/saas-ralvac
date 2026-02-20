import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const webhook = await prisma.webhook.findUnique({  
    where: { id: params.id },  
    include: {  
      logs: {  
        orderBy: { criadoEm: 'desc' },  
        take: 50  
      }  
    }  
  });  
    
  if (!webhook) {  
    return NextResponse.json({ error: 'Webhook não encontrado' }, { status: 404 });  
  }  
    
  return NextResponse.json(webhook);  
}  
  
export async function PATCH(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  const body = await request.json();  
    
  const webhook = await prisma.webhook.update({  
    where: { id: params.id },  
    data: body  
  });  
    
  return NextResponse.json(webhook);  
}  
  
export async function DELETE(  
  request: NextRequest,  
  { params }: { params: { id: string } }  
) {  
  await prisma.webhook.delete({  
    where: { id: params.id }  
  });  
    
  return NextResponse.json({ success: true });  
}