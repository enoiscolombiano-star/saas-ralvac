'use client';  
  
type Webhook = {  
  id: string;  
  nome: string;  
  url: string;  
  eventos: string[];  
  ativo: boolean;  
  criadoEm: string;  
};  
  
type Props = {  
  webhooks: Webhook[];  
  onEdit: (webhook: Webhook) => void;  
  onDelete: (id: string) => void;  
};  
  
export default function WebhookList({ webhooks, onEdit, onDelete }: Props) {  
  const getEventoLabel = (evento: string) => {  
    const labels: Record<string, string> = {  
      'TASK_CREATED': 'Tarefa Criada',  
      'TASK_UPDATED': 'Tarefa Atualizada',  
      'TASK_STATUS_CHANGED': 'Status Alterado',  
      'AD_PUBLISHED': 'Anúncio Publicado'  
    };  
    return labels[evento] || evento;  
  };  
  
  if (webhooks.length === 0) {  
    return (  
      <div className="text-center py-12 text-gray-500">  
        Nenhum webhook configurado. Clique em "Novo Webhook" para começar.  
      </div>  
    );  
  }  
  
  return (  
    <div className="grid gap-4">  
      {webhooks.map(webhook => (  
        <div  
          key={webhook.id}  
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"  
        >  
          <div className="flex justify-between items-start mb-2">  
            <div>  
              <h3 className="text-lg font-bold">{webhook.nome}</h3>  
              <p className="text-sm text-gray-600 break-all">{webhook.url}</p>  
            </div>  
            <div className="flex gap-2">  
              <span  
                className={`px-2 py-1 rounded text-xs font-medium ${  
                  webhook.ativo  
                    ? 'bg-green-100 text-green-800'  
                    : 'bg-gray-100 text-gray-800'  
                }`}  
              >  
                {webhook.ativo ? 'Ativo' : 'Inativo'}  
              </span>  
            </div>  
          </div>  
  
          <div className="mb-3">  
            <p className="text-sm font-medium mb-1">Eventos:</p>  
            <div className="flex flex-wrap gap-1">  
              {webhook.eventos.map(evento => (  
                <span  
                  key={evento}  
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"  
                >  
                  {getEventoLabel(evento)}  
                </span>  
              ))}  
            </div>  
          </div>  
  
          <div className="flex gap-2 mt-3">  
            <button  
              onClick={() => onEdit(webhook)}  
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"  
            >  
              Editar  
            </button>  
            <button  
              onClick={() => onDelete(webhook.id)}  
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"  
            >  
              Deletar  
            </button>  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
}