'use client';  
  
import { useState } from 'react';  
  
type Props = {  
  taskId: string;  
  onClose: () => void;  
};  
  
export default function DefinitionForm({ taskId, onClose }: Props) {  
  const [data, setData] = useState({  
    modeloAnuncio: '',  
    tipoEdicao: 'NOVO' as 'NOVO' | 'EDICAO_VSL'  
  });  
  
  const handleSubmit = async () => {  
    await fetch('/api/definitions', {  
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify({ ...data, taskId })  
    });  
    onClose();  
  };  
  
  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">  
      <div className="bg-white p-6 rounded w-96">  
        <h2 className="text-xl font-bold mb-4">Definição da Tarefa</h2>  
          
        <div className="mb-4">  
          <label className="block mb-2">Modelo de Anúncio</label>  
          <input  
            className="w-full border p-2 rounded"  
            value={data.modeloAnuncio}  
            onChange={e => setData({ ...data, modeloAnuncio: e.target.value })}  
          />  
        </div>  
  
        <div className="mb-4">  
          <label className="block mb-2">Tipo de Edição</label>  
          <select  
            className="w-full border p-2 rounded"  
            value={data.tipoEdicao}  
            onChange={e => setData({ ...data, tipoEdicao: e.target.value as any })}  
          >  
            <option value="NOVO">Novo</option>  
            <option value="EDICAO_VSL">Edição VSL</option>  
          </select>  
        </div>  
  
        <div className="flex gap-2">  
          <button  
            onClick={handleSubmit}  
            className="bg-blue-500 text-white px-4 py-2 rounded"  
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