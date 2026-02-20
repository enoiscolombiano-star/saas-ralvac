import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';  
  
export async function logAudit(params: {  
  userId: string;  
  action: AuditAction;  
  entityType: string;  
  entityId: string;  
  changes?: Record<string, any>;  
}) {  
  const { userId, action, entityType, entityId, changes } = params;  
  
  await prisma.auditLog.create({  
    data: {  
      userId,  
      action,  
      entityType,  
      entityId,  
      changes: changes ? JSON.stringify(changes) : null  
    }  
  });  
}