import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
    
  const utmConfig = await prisma.uTMConfig.create({  
    data: {  
      taskId: body.taskId,  
      campaignName: body.campaignName,  
      funcao: body.funcao,  
      copy: body.copy,  
      lead: body.lead,  
      editor: body.editor,  
      hook: body.hook,  
      persona: body.persona,  
    },  
    include: {  
      task: true  
    }  
  });  
    
  return NextResponse.json(utmConfig);  
}  
  
export async function GET(request: NextRequest) {  
  const { searchParams } = new URL(request.url);  
  const taskId = searchParams.get('taskId');  
    
  if (taskId) {  
    const configs = await prisma.uTMConfig.findMany({  
      where: { taskId },  
      include: { task: true },  
      orderBy: { criadoEm: 'desc' }  
    });  
    return NextResponse.json(configs);  
  }  
    
  const configs = await prisma.uTMConfig.findMany({  
    include: { task: true },  
    orderBy: { criadoEm: 'desc' }  
  });  
    
  return NextResponse.json(configs);  
}