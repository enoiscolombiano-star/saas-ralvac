'use client';  
  
import { useState, useEffect } from 'react';  
import MetricsCard from '@/components/dashboard/MetricsCard';  
import MetricsChart from '@/components/dashboard/MetricsChart';  
import AdsList from '@/components/dashboard/AdsList';  
  
type Metrics = {  
  impressoes: number;  
  cliques: number;  
  conversoes: number;  
  gastoTotal: number;  
  ctr: number;  
  cpc: number;  
  cpa: number;  
};  
  
type AdMetrics = {  
  ad: any;  
  impressoes: number;  
  cliques: number;  
  conversoes: number;  
  gastoTotal: number;  
};  
  
export default function DashboardPage() {  
  const [period, setPeriod] = useState('30');  
  const [generalMetrics, setGeneralMetrics] = useState<Metrics | null>(null);  
  const [adMetrics, setAdMetrics] = useState<AdMetrics[]>([]);  
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {  
    fetchMetrics();  
  }, [period]);  
  
  const fetchMetrics = async () => {  
    setLoading(true);  
      
    const res = await fetch(`/api/metrics?period=${period}`);  
    const data = await res.json();  
      
    if (Array.isArray(data)) {  
      setAdMetrics(data);  
        
      const totals = data.reduce((acc, m) => ({  
        impressoes: acc.impressoes + m.impressoes,  
        cliques: acc.cliques + m.cliques,  
        conversoes: acc.conversoes + m.conversoes,  
        gastoTotal: acc.gastoTotal + m.gastoTotal  
      }), { impressoes: 0, cliques: 0, conversoes: 0, gastoTotal: 0 });  
  
      setGeneralMetrics({  
        ...totals,  
        ctr: totals.impressoes > 0 ? (totals.cliques / totals.impressoes) * 100 : 0,  
        cpc: totals.cliques > 0 ? totals.gastoTotal / totals.cliques : 0,  
        cpa: totals.conversoes > 0 ? totals.gastoTotal / totals.conversoes : 0  
      });  
    }  
      
    setLoading(false);  
  };  
  
  return (  
    <div className="p-8">  
      <div className="flex justify-between items-center mb-6">  
        <h1 className="text-2xl font-bold">Dashboard UTMify</h1>  
        <select  
          value={period}  
          onChange={(e) => setPeriod(e.target.value)}  
          className="border p-2 rounded"  
        >  
          <option value="7">Últimos 7 dias</option>  
          <option value="30">Últimos 30 dias</option>  
          <option value="90">Últimos 90 dias</option>  
        </select>  
      </div>  
  
      {loading ? (  
        <p>Carregando métricas...</p>  
      ) : (  
        <>  
          {generalMetrics && (  
            <div className="grid grid-cols-4 gap-4 mb-6">  
              <MetricsCard  
                title="Impressões"  
                value={generalMetrics.impressoes.toLocaleString()}  
                icon="👁️"  
              />  
              <MetricsCard  
                title="Cliques"  
                value={generalMetrics.cliques.toLocaleString()}  
                subtitle={`CTR: ${generalMetrics.ctr.toFixed(2)}%`}  
                icon="🖱️"  
              />  
              <MetricsCard  
                title="Conversões"  
                value={generalMetrics.conversoes.toLocaleString()}  
                subtitle={`CPA: R$ ${generalMetrics.cpa.toFixed(2)}`}  
                icon="✅"  
              />  
              <MetricsCard  
                title="Gasto Total"  
                value={`R$ ${generalMetrics.gastoTotal.toFixed(2)}`}  
                subtitle={`CPC: R$ ${generalMetrics.cpc.toFixed(2)}`}  
                icon="💰"  
              />  
            </div>  
          )}  
  
          <div className="mb-6">  
            <h2 className="text-xl font-semibold mb-4">Gráfico de Performance</h2>  
            <MetricsChart data={adMetrics} />  
          </div>  
  
          <div>  
            <h2 className="text-xl font-semibold mb-4">Anúncios por Performance</h2>  
            <AdsList ads={adMetrics} />  
          </div>  
        </>  
      )}  
    </div>  
  );  
}