import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(request: NextRequest) {  
  const searchParams = request.nextUrl.searchParams;  
  const taskId = searchParams.get('taskId');  
  
  const where = taskId ? { taskId } : {};  
  
  const definitions = await prisma.taskDefinition.findMany({  
    where,  
    include: {  
      task: true  
    }  
  });  
  
  return NextResponse.json(definitions);  
}  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  
  const definition = await prisma.taskDefinition.create({  
    data: body  
  });  
  
  return NextResponse.json(definition);  
}