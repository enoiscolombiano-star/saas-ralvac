import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET() {  
  const tasks = await prisma.task.findMany({  
    orderBy: { criadoEm: 'desc' }  
  });  
  return NextResponse.json(tasks);  
}  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  const task = await prisma.task.create({  
    data: {  
      nomeCompleto: body.nomeCompleto,  
      prefixo: body.prefixo,  
      criadoPor: body.criadoPor,  
    }  
  });  
  return NextResponse.json(task);  
}