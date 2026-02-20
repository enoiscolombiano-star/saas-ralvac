import { PrismaClient, AuditAction } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
type AuditLogData = {  
  userId?: string;  
  action: AuditAction;  
  entityType: string;  
  entityId?: string;  
  changes?: Record<string, any>;  
  ipAddress?: string;  
  userAgent?: string;  
};  
  
export async function createAuditLog(data: AuditLogData) {  
  try {  
    await prisma.auditLog.create({  
      data: {  
        userId: data.userId,  
        action: data.action,  
        entityType: data.entityType,  
        entityId: data.entityId,  
        changes: data.changes ? JSON.stringify(data.changes) : null,  
        ipAddress: data.ipAddress,  
        userAgent: data.userAgent  
      }  
    });  
  } catch (error) {  
    console.error('Erro ao criar log de auditoria:', error);  
  }  
}  
  
export function getClientInfo(request: Request) {  
  return {  
    ipAddress: request.headers.get('x-forwarded-for') ||   
               request.headers.get('x-real-ip') ||   
               'unknown',  
    userAgent: request.headers.get('user-agent') || 'unknown'  
  };  
}