'use client';  
  
import { useState, useEffect } from 'react';  
  
type Props = {  
  webhook: any | null;  
  onClose: () => void;  
};  
  
const EVENTOS_DISPONIVEIS = [  
  { value: 'TASK_CREATED', label: 'Tarefa Criada' },  
  { value: 'TASK_UPDATED', label: 'Tarefa Atualizada' },  
  { value: 'TASK_STATUS_CHANGED', label: 'Status Alterado' },  
  { value: 'AD_PUBLISHED', label: 'Anúncio Publicado' }  
];  
  
export default function WebhookForm({ webhook, onClose }: Props) {  
  const [data, setData] = useState({  
    nome: '',  
    url: '',  
    eventos: [] as string[],  
    ativo: true,  
    secret: ''  
  });  
  
  useEffect(() => {  
    if (webhook) {  
      setData({  
        nome: webhook.nome,  
        url: webhook.url,  
        eventos: webhook.eventos,  
        ativo: webhook.ativo,  
        secret: webhook.secret || ''  
      });  
    }  
  }, [webhook]);  
  
  const handleSubmit = async () => {  
    const method = webhook ? 'PATCH' : 'POST';  
    const url = webhook ? `/api/webhooks/${webhook.id}` : '/api/webhooks';  
  
    await fetch(url, {  
      method,  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify(data)  
    });  
  
    onClose();  
  };  
  
  const toggleEvento = (evento: string) => {  
    setData(prev => ({  
      ...prev,  
      eventos: prev.eventos.includes(evento)  
        ? prev.eventos.filter(e => e !== evento)  
        : [...prev.eventos, evento]  
    }));  
  };  
  
  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">  
        <h2 className="text-xl font-bold mb-4">  
          {webhook ? 'Editar Webhook' : 'Novo Webhook'}  
        </h2>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Nome</label>  
          <input  
            type="text"  
            className="w-full border p-2 rounded"  
            value={data.nome}  
            onChange={e => setData({ ...data, nome: e.target.value })}  
            placeholder="Ex: Notificação Slack"  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">URL</label>  
          <input  
            type="url"  
            className="w-full border p-2 rounded"  
            value={data.url}  
            onChange={e => setData({ ...data, url: e.target.value })}  
            placeholder="https://exemplo.com/webhook"  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Eventos</label>  
          <div className="space-y-2">  
            {EVENTOS_DISPONIVEIS.map(evento => (  
              <label key={evento.value} className="flex items-center gap-2">  
                <input  
                  type="checkbox"  
                  checked={data.eventos.includes(evento.value)}  
                  onChange={() => toggleEvento(evento.value)}  
                  className="w-4 h-4"  
                />  
                <span>{evento.label}</span>  
              </label>  
            ))}  
          </div>  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Secret (opcional)</label>  
          <input  
            type="text"  
            className="w-full border p-2 rounded"  
            value={data.secret}  
            onChange={e => setData({ ...data, secret: e.target.value })}  
            placeholder="Chave secreta para validação"  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="flex items-center gap-2">  
            <input  
              type="checkbox"  
              checked={data.ativo}  
              onChange={e => setData({ ...data, ativo: e.target.checked })}  
              className="w-4 h-4"  
            />  
            <span className="font-medium">Webhook Ativo</span>  
          </label>  
        </div>  
  
        <div className="flex gap-2">  
          <button  
            onClick={handleSubmit}  
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
          >  
            {webhook ? 'Atualizar' : 'Criar'}  
          </button>  
          <button  
            onClick={onClose}  
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"  
          >  
            Cancelar  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}