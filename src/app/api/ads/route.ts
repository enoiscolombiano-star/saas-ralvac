import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
import { dispatchWebhook } from '@/lib/webhook-dispatcher';  
import { generateUTMLink } from '@/lib/utm/generator';  
  
const prisma = new PrismaClient();  
  
export async function GET(request: NextRequest) {  
  const searchParams = request.nextUrl.searchParams;  
  const taskId = searchParams.get('taskId');  
  
  const where = taskId ? { taskId } : {};  
  
  const ads = await prisma.ad.findMany({  
    where,  
    include: {  
      task: {  
        include: {  
          utmConfigs: true  
        }  
      },  
      metrics: true  
    },  
    orderBy: { criadoEm: 'desc' }  
  });  
  
  return NextResponse.json(ads);  
}  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  const { taskId, titulo, descricao, linkOriginal } = body;  
  
  const task = await prisma.task.findUnique({  
    where: { id: taskId },  
    include: {  
      utmConfigs: true  
    }  
  });  
  
  if (!task) {  
    return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });  
  }  
  
  // CORREÇÃO: Acessar o primeiro elemento do array  
  const utmConfig = task.utmConfigs[0];  
    
  const linkGerado = utmConfig ? generateUTMLink(linkOriginal, {  
    campaignName: utmConfig.campaignName,  
    funcao: utmConfig.funcao || '',  
    copy: utmConfig.copy || '',  
    lead: utmConfig.lead || '',  
    editor: utmConfig.editor || '',  
    hook: utmConfig.hook || '',  
    persona: utmConfig.persona || ''  
  }) : linkOriginal;  
  
  const ad = await prisma.ad.create({  
    data: {  
      taskId,  
      titulo,  
      descricao,  
      linkOriginal,  
      linkGerado,  
      status: 'RASCUNHO'  
    }  
  });  
  
  await dispatchWebhook('AD_PUBLISHED', { ad });  
  
  return NextResponse.json(ad);  
}