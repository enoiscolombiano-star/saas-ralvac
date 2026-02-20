'use client';  
  
import { useState, useEffect } from 'react';  
import WebhookForm from '@/components/webhooks/WebhookForm';  
import WebhookList from '@/components/webhooks/WebhookList';  
  
type Webhook = {  
  id: string;  
  nome: string;  
  url: string;  
  eventos: string[];  
  ativo: boolean;  
  criadoEm: string;  
};  
  
export default function WebhooksPage() {  
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);  
  const [showForm, setShowForm] = useState(false);  
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null);  
  
  useEffect(() => {  
    fetchWebhooks();  
  }, []);  
  
  const fetchWebhooks = async () => {  
    const res = await fetch('/api/webhooks');  
    const data = await res.json();  
    setWebhooks(data);  
  };  
  
  const handleCreate = () => {  
    setEditingWebhook(null);  
    setShowForm(true);  
  };  
  
  const handleEdit = (webhook: Webhook) => {  
    setEditingWebhook(webhook);  
    setShowForm(true);  
  };  
  
  const handleDelete = async (id: string) => {  
    if (!confirm('Tem certeza que deseja deletar este webhook?')) return;  
      
    await fetch(`/api/webhooks/${id}`, { method: 'DELETE' });  
    fetchWebhooks();  
  };  
  
  const handleFormClose = () => {  
    setShowForm(false);  
    setEditingWebhook(null);  
    fetchWebhooks();  
  };  
  
  return (  
    <div className="p-8">  
      <div className="flex justify-between items-center mb-6">  
        <h1 className="text-2xl font-bold">Webhooks</h1>  
        <button  
          onClick={handleCreate}  
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
        >  
          Novo Webhook  
        </button>  
      </div>  
  
      <WebhookList  
        webhooks={webhooks}  
        onEdit={handleEdit}  
        onDelete={handleDelete}  
      />  
  
      {showForm && (  
        <WebhookForm  
          webhook={editingWebhook}  
          onClose={handleFormClose}  
        />  
      )}  
    </div>  
  );  
}