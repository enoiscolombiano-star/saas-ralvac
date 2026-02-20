'use client';  
  
type Ad = {  
  id: string;  
  titulo: string;  
  descricao?: string;  
  linkGerado: string;  
  linkVSL?: string;  
  status: string;  
};  
  
type Props = {  
  ad: Ad;  
};  
  
export default function AdPreview({ ad }: Props) {  
  const copyToClipboard = (text: string) => {  
    navigator.clipboard.writeText(text);  
    alert('Link copiado para a área de transferência!');  
  };  
  
  return (  
    <div className="border rounded-lg p-4 bg-gray-50">  
      <h3 className="text-lg font-bold mb-2">{ad.titulo}</h3>  
        
      {ad.descricao && (  
        <p className="text-sm text-gray-600 mb-3">{ad.descricao}</p>  
      )}  
  
      <div className="mb-3">  
        <label className="block text-sm font-medium mb-1">Link Gerado (UTM):</label>  
        <div className="flex gap-2">  
          <input  
            type="text"  
            className="flex-1 border p-2 rounded text-sm bg-white"  
            value={ad.linkGerado}  
            readOnly  
          />  
          <button  
            onClick={() => copyToClipboard(ad.linkGerado)}  
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"  
          >  
            Copiar  
          </button>  
        </div>  
      </div>  
  
      {ad.linkVSL && (  
        <div className="mb-3">  
          <label className="block text-sm font-medium mb-1">Link VSL:</label>  
          <a  
            href={ad.linkVSL}  
            target="_blank"  
            rel="noopener noreferrer"  
            className="text-blue-600 hover:underline text-sm"  
          >  
            {ad.linkVSL}  
          </a>  
        </div>  
      )}  
  
      <div>  
        <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${  
          ad.status === 'VEICULADO' ? 'bg-green-100 text-green-800' :  
          ad.status === 'PAUSADO' ? 'bg-yellow-100 text-yellow-800' :  
          ad.status === 'FINALIZADO' ? 'bg-gray-100 text-gray-800' :  
          'bg-blue-100 text-blue-800'  
        }`}>  
          {ad.status}  
        </span>  
      </div>  
    </div>  
  );  
}