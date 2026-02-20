import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
import { dispatchWebhook } from '@/lib/webhook-dispatcher';  
  
const prisma = new PrismaClient();  
  
export async function GET(request: NextRequest) {  
  const searchParams = request.nextUrl.searchParams;  
  const taskId = searchParams.get('taskId');  
  
  const where = taskId ? { taskId } : {};  
  
  const ads = await prisma.ad.findMany({  
    where,  
    include: {  
      task: true,  
      metrics: true  // CORRIGIDO: era 'metricas'  
    },  
    orderBy: { criadoEm: 'desc' }  
  });  
  
  return NextResponse.json(ads);  
}  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  const { taskId, titulo, descricao, linkBase } = body;  
  
  const task = await prisma.task.findUnique({  
    where: { id: taskId },  
    include: {  
      utmConfigs: true,  
      metrics: true  // CORRIGIDO: era 'metricas'  
    }  
  });  
  
  if (!task) {  
    return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });  
  }  
  
  // Gerar link UTM  
  const utmConfig = task.utmConfigs[0];  
  const utmParams = new URLSearchParams({  
    utm_source: 'facebook',  
    utm_medium: 'cpc',  
    utm_campaign: utmConfig?.campaignName || task.prefixo,  
    utm_content: utmConfig?.copy || '',  
    utm_term: utmConfig?.persona || ''  
  });  
  
  const linkGerado = `${linkBase}?${utmParams.toString()}`;  
  
  const ad = await prisma.ad.create({  
    data: {  
      taskId,  
      titulo,  
      descricao,  
      linkGerado,  
      status: 'RASCUNHO'  
      // REMOVIDO: linkVSL (não existe no schema)  
    }  
  });  
  
  // Disparar webhook  
  await dispatchWebhook('AD_PUBLISHED', {  
    adId: ad.id,  
    taskId: task.id,  
    titulo: ad.titulo,  
    linkGerado: ad.linkGerado  
  });  
  
  return NextResponse.json(ad);  
}