import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(request: NextRequest) {  
  const userRole = request.headers.get('x-user-role');  
  
  if (userRole !== 'ADMIN') {  
    return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });  
  }  
  
  const { searchParams } = new URL(request.url);  
  const userId = searchParams.get('userId');  
  const entityType = searchParams.get('entityType');  
  const action = searchParams.get('action');  
  const limit = parseInt(searchParams.get('limit') || '100');  
  
  const where: any = {};  
  if (userId) where.userId = userId;  
  if (entityType) where.entityType = entityType;  
  if (action) where.action = action;  
  
  const logs = await prisma.auditLog.findMany({  
    where,  
    include: {  
      user: {  
        select: {  
          id: true,  
          nome: true,  
          email: true  
        }  
      }  
    },  
    orderBy: { criadoEm: 'desc' },  
    take: limit  
  });  
  
  return NextResponse.json(logs);  
}