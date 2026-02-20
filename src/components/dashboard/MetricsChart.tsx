'use client';  
  
type AdMetrics = {  
  ad: any;  
  impressoes: number;  
  cliques: number;  
  conversoes: number;  
  gastoTotal: number;  
};  
  
type Props = {  
  data: AdMetrics[];  
};  
  
export default function MetricsChart({ data }: Props) {  
  if (data.length === 0) {  
    return <p className="text-gray-500">Nenhum dado disponível</p>;  
  }  
  
  const maxValue = Math.max(...data.map(d => d.impressoes));  
  
  return (  
    <div className="bg-white border rounded-lg p-4">  
      <div className="space-y-4">  
        {data.slice(0, 10).map((item, index) => {  
          const percentage = (item.impressoes / maxValue) * 100;  
          const ctr = item.impressoes > 0 ? (item.cliques / item.impressoes) * 100 : 0;  
  
          return (  
            <div key={index}>  
              <div className="flex justify-between mb-1">  
                <span className="text-sm font-medium">{item.ad.titulo}</span>  
                <span className="text-sm text-gray-600">  
                  {item.impressoes.toLocaleString()} impressões | CTR: {ctr.toFixed(2)}%  
                </span>  
              </div>  
              <div className="w-full bg-gray-200 rounded-full h-2">  
                <div  
                  className="bg-blue-500 h-2 rounded-full"  
                  style={{ width: `${percentage}%` }}  
                />  
              </div>  
            </div>  
          );  
        })}  
      </div>  
    </div>  
  );  
}