'use client';  
  
import { useState, useEffect } from 'react';  
  
type Task = {  
  id: string;  
  nomeCompleto: string;  
  prefixo: string;  
};  
  
type Ad = {  
  id: string;  
  titulo: string;  
  descricao?: string;  
  linkVSL?: string;  
  status: string;  
};  
  
type Props = {  
  task: Task;  
  ad: Ad | null;  
  onClose: () => void;  
};  
  
export default function AdForm({ task, ad, onClose }: Props) {  
  const [data, setData] = useState({  
    titulo: '',  
    descricao: '',  
    linkVSL: '',  
    status: 'RASCUNHO' as 'RASCUNHO' | 'VEICULADO' | 'PAUSADO' | 'FINALIZADO'  
  });  
  
  useEffect(() => {  
    if (ad) {  
      setData({  
        titulo: ad.titulo,  
        descricao: ad.descricao || '',  
        linkVSL: ad.linkVSL || '',  
        status: ad.status as any  
      });  
    }  
  }, [ad]);  
  
  const handleSubmit = async () => {  
    const method = ad ? 'PATCH' : 'POST';  
    const url = ad ? `/api/ads/${ad.id}` : '/api/ads';  
  
    await fetch(url, {  
      method,  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify({ ...data, taskId: task.id })  
    });  
  
    onClose();  
  };  
  
  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">  
      <div className="bg-white p-6 rounded-lg w-[500px]">  
        <h2 className="text-xl font-bold mb-4">  
          {ad ? 'Editar Anúncio' : 'Criar Anúncio'}  
        </h2>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Tarefa</label>  
          <input  
            type="text"  
            className="w-full border p-2 rounded bg-gray-100"  
            value={task.nomeCompleto}  
            disabled  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Título do Anúncio</label>  
          <input  
            type="text"  
            className="w-full border p-2 rounded"  
            value={data.titulo}  
            onChange={e => setData({ ...data, titulo: e.target.value })}  
            placeholder="Ex: Anúncio CRETINCHO - Campanha 2024"  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Descrição (opcional)</label>  
          <textarea  
            className="w-full border p-2 rounded"  
            rows={3}  
            value={data.descricao}  
            onChange={e => setData({ ...data, descricao: e.target.value })}  
            placeholder="Descrição do anúncio..."  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Link VSL (opcional)</label>  
          <input  
            type="url"  
            className="w-full border p-2 rounded"  
            value={data.linkVSL}  
            onChange={e => setData({ ...data, linkVSL: e.target.value })}  
            placeholder="https://exemplo.com/vsl"  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2 font-medium">Status</label>  
          <select  
            className="w-full border p-2 rounded"  
            value={data.status}  
            onChange={e => setData({ ...data, status: e.target.value as any })}  
          >  
            <option value="RASCUNHO">Rascunho</option>  
            <option value="VEICULADO">Veiculado</option>  
            <option value="PAUSADO">Pausado</option>  
            <option value="FINALIZADO">Finalizado</option>  
          </select>  
        </div>  
  
        <div className="flex gap-2">  
          <button  
            onClick={handleSubmit}  
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
          >  
            {ad ? 'Atualizar' : 'Criar'}  
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