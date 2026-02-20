import { PrismaClient } from '@/generated/prisma';  
import { randomBytes } from 'crypto';  
  
const prisma = new PrismaClient();  
  
export async function createSession(userId: string) {  
  const token = randomBytes(32).toString('hex');  
  const expiresAt = new Date();  
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 dias  
  
  await prisma.session.create({  
    data: {  
      userId,  
      token,  
      expiresAt  
    }  
  });  
  
  return token;  
}  
  
export async function verifySession(token: string) {  // ADICIONADO: export  
  const session = await prisma.session.findUnique({  
    where: { token },  
    include: { user: true }  
  });  
  
  if (!session || session.expiresAt < new Date()) {  
    return null;  
  }  
  
  return session;  
}  
  
export async function deleteSession(token: string) {  
  await prisma.session.delete({  
    where: { token }  
  });  
}
