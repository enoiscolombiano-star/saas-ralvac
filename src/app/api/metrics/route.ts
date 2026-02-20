import { NextRequest, NextResponse } from 'next/server';  
import { PrismaClient } from '@/generated/prisma';  
  
const prisma = new PrismaClient();  
  
export async function GET(request: NextRequest) {  
  const searchParams = request.nextUrl.searchParams;  
  const period = searchParams.get('period') || '30';  
  const adId = searchParams.get('adId');  
  
  const startDate = new Date();  
  startDate.setDate(startDate.getDate() - parseInt(period));  
  const endDate = new Date();  
  
  const where: any = {  
    criadoEm: {  // CORRIGIDO: era 'data'  
      gte: startDate,  
      lte: endDate  
    }  
  };  
  
  if (adId) {  
    where.adId = adId;  
  }  
  
  const metrics = await prisma.adMetric.findMany({  
    where,  
    include: {  
      ad: true  // ADICIONADO: incluir relação com ad  
    },  
    orderBy: { criadoEm: 'desc' }  // CORRIGIDO: era 'data'  
  });  
  
  return NextResponse.json(metrics);  
}  
  
export async function POST(request: NextRequest) {  
  const body = await request.json();  
  const { adId } = body;  
  
  // Buscar métricas do UTMify (mock por enquanto)  
  const utmifyData = {  
    impressoes: Math.floor(Math.random() * 10000),  
    cliques: Math.floor(Math.random() * 1000),  
    conversoes: Math.floor(Math.random() * 100),  
    gastoTotal: Math.random() * 1000  
  };  
  
  const metric = await prisma.adMetric.create({  
    data: {  
      adId,  
      impressoes: body.impressoes || utmifyData.impressoes,  
      cliques: body.cliques || utmifyData.cliques,  
      conversoes: body.conversoes || utmifyData.conversoes,  
      gastoTotal: body.gastoTotal || utmifyData.gastoTotal  
    }  
  });  
  
  return NextResponse.json(metric);  
}