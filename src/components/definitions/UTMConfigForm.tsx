'use client';  
  
import { useState } from 'react';  
  
type Props = {  
  taskId: string;  
  onClose: () => void;  
};  
  
export default function UTMConfigForm({ taskId, onClose }: Props) {  
  const [data, setData] = useState({  
    campaignName: '',  
    funcao: '',  
    copy: '',  
    lead: '',  
    editor: '',  
    hook: '',  
    persona: ''  
  });  
  
  const handleSubmit = async () => {  
    await fetch('/api/utm-configs', {  
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify({ ...data, taskId })  
    });  
    onClose();  
  };  
  
  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">  
      <div className="bg-white p-6 rounded w-96 max-h-[80vh] overflow-y-auto">  
        <h2 className="text-xl font-bold mb-4">Configuração UTM</h2>  
          
        <div className="mb-4">  
          <label className="block mb-2">Campaign Name</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.campaignName}  
            onChange={e => setData({ ...data, campaignName: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Função</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.funcao}  
            onChange={e => setData({ ...data, funcao: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Copy</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.copy}  
            onChange={e => setData({ ...data, copy: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Lead</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.lead}  
            onChange={e => setData({ ...data, lead: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Editor</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.editor}  
            onChange={e => setData({ ...data, editor: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Hook</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.hook}  
            onChange={e => setData({ ...data, hook: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Persona</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.persona}  
            onChange={e => setData({ ...data, persona: e.target.value })}  
          />  
        </div>  
  
        <div className="flex gap-2">  
          <button  
            onClick={handleSubmit}  
            className="bg-green-500 text-white px-4 py-2 rounded"  
          >  
            Salvar  
          </button>  
          <button  
            onClick={onClose}  
            className="bg-gray-300 px-4 py-2 rounded"  
          >  
            Cancelar  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}