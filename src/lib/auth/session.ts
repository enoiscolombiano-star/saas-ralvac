import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function createSession(userId: string): Promise<string> {  
  const sessionToken = crypto.randomUUID();  
    
  await prisma.session.create({  
    data: {  
      userId,  
      token: sessionToken,  
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias  
    }  
  });  
  
  return sessionToken;  
}  
  
export async function verifySession(token: string) {  
  const session = await prisma.session.findUnique({  
    where: { token },  
    include: { user: true }  
  });  
  
  if (!session || session.expiresAt < new Date()) {  
    return null;  
  }  
  
  return session;  
}  
  
// ADICIONADO: função deleteSession que estava faltando  
export async function deleteSession(token: string): Promise<void> {  
  await prisma.session.delete({  
    where: { token }  
  });  
}