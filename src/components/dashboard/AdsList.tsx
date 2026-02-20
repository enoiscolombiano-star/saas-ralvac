'use client';  
  
type AdMetrics = {  
  ad: any;  
  impressoes: number;  
  cliques: number;  
  conversoes: number;  
  gastoTotal: number;  
};  
  
type Props = {  
  ads: AdMetrics[];  
};  
  
export default function AdsList({ ads }: Props) {  
  if (ads.length === 0) {  
    return <p className="text-gray-500">Nenhum anúncio com métricas</p>;  
  }  
  
  const sortedAds = [...ads].sort((a, b) => b.conversoes - a.conversoes);  
  
  return (  
    <div className="bg-white border rounded-lg overflow-hidden">  
      <table className="w-full">  
        <thead className="bg-gray-50">  
          <tr>  
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anúncio</th>  
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Impressões</th>  
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cliques</th>  
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">CTR</th>  
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Conversões</th>  
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gasto</th>  
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">CPA</th>  
          </tr>  
        </thead>  
        <tbody className="divide-y divide-gray-200">  
          {sortedAds.map((item, index) => {  
            const ctr = item.impressoes > 0 ? (item.cliques / item.impressoes) * 100 : 0;  
            const cpa = item.conversoes > 0 ? item.gastoTotal / item.conversoes : 0;  
  
            return (  
              <tr key={index} className="hover:bg-gray-50">  
                <td className="px-4 py-3">  
                  <div>  
                    <p className="font-medium">{item.ad.titulo}</p>  
                    <p className="text-xs text-gray-500">{item.ad.task.nomeCompleto}</p>  
                  </div>  
                </td>  
                <td className="px-4 py-3 text-right">{item.impressoes.toLocaleString()}</td>  
                <td className="px-4 py-3 text-right">{item.cliques.toLocaleString()}</td>  
                <td className="px-4 py-3 text-right">{ctr.toFixed(2)}%</td>  
                <td className="px-4 py-3 text-right font-medium">{item.conversoes}</td>  
                <td className="px-4 py-3 text-right">R$ {item.gastoTotal.toFixed(2)}</td>  
                <td className="px-4 py-3 text-right">R$ {cpa.toFixed(2)}</td>  
              </tr>  
            );  
          })}  
        </tbody>  
      </table>  
    </div>  
  );  
}