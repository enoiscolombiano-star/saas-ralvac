import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET() {  
  const webhooks = await prisma.webhook.findMany({  
    orderBy: { criadoEm: 'desc' }  
  });  
  
  return NextResponse.json(webhooks);  
}  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  
  const webhook = await prisma.webhook.create({  
    data: body  
  });  
  
  return NextResponse.json(webhook);  
}