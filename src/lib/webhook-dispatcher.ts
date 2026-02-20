import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
type WebhookEvent = 'TASK_CREATED' | 'TASK_UPDATED' | 'TASK_STATUS_CHANGED' | 'AD_PUBLISHED';  
  
export async function dispatchWebhook(event: WebhookEvent, data: any) {  
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
      const payload = {  
        event,  
        data,  
        timestamp: new Date().toISOString()  
      };  
  
      const headers: Record<string, string> = {  
        'Content-Type': 'application/json'  
      };  
  
      if (webhook.secret) {  
        headers['X-Webhook-Secret'] = webhook.secret;  
      }  
  
      const response = await fetch(webhook.url, {  
        method: 'POST',  
        headers,  
        body: JSON.stringify(payload)  
      });  
  
      await prisma.webhookLog.create({  
        data: {  
          webhookId: webhook.id,  
          statusCode: response.status,  // CORRIGIDO: era 'status'  
          response: JSON.stringify(await response.text())  
        }  
      });  
    } catch (error) {  
      await prisma.webhookLog.create({  
        data: {  
          webhookId: webhook.id,  
          statusCode: 500,  // CORRIGIDO: era 'status'  
          response: JSON.stringify({ error: String(error) })  
        }  
      });  
    }  
  }  
}