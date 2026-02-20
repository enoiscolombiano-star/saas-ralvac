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
      }  
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
    include: { utmConfigs: true }  
  });  
  
  if (!task || !task.utmConfigs) {  
    return NextResponse.json({ error: 'Task ou UTM config não encontrada' }, { status: 404 });  
  }  
  
  const utmConfig = task.utmConfigs;  
  
  const linkGerado = generateUTMLink(linkOriginal, {  
    campaignName: utmConfig.campaignName,  // CORRIGIDO: era 'campaign'  
    funcao: utmConfig.funcao,  
    copy: utmConfig.copy,  
    lead: utmConfig.lead,  
    editor: utmConfig.editor,  
    hook: utmConfig.hook,  
    persona: utmConfig.persona  
  });  
  
  const ad = await prisma.ad.create({  
    data: {  
      taskId,  
      titulo,  
      descricao,  
      linkOriginal,  
      linkGerado,  
      status: 'RASCUNHO'  
    },  
    include: {  
      task: true  
    }  
  });  
  
  await dispatchWebhook('AD_PUBLISHED', { ad });  
  
  return NextResponse.json(ad);  
}