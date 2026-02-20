import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function dispatchWebhook(event: string, payload: any) {  
  const webhooks = await prisma.webhook.findMany({  
    where: {  
      ativo: true,  
      eventos: {  
        has: event  
      }  
    }  
  });  
  
  for (const webhook of webhooks) {  
    try {  
      const response = await fetch(webhook.url, {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
          ...(webhook.secret && { 'X-Webhook-Secret': webhook.secret })  
        },  
        body: JSON.stringify({  
          event,  
          payload,  
          timestamp: new Date().toISOString()  
        })  
      });  
  
      await prisma.webhookLog.create({  
        data: {  
          webhookId: webhook.id,  
          evento: event,  
          payload,  
          status: response.status,  // CORRIGIDO: era 'sucesso: true'  
          resposta: await response.text()  
        }  
      });  
    } catch (error) {  
      await prisma.webhookLog.create({  
        data: {  
          webhookId: webhook.id,  
          evento: event,  
          payload,  
          status: 500,  // CORRIGIDO: era 'sucesso: false'  
          resposta: error instanceof Error ? error.message : 'Erro desconhecido'  
        }  
      });  
    }  
  }  
}