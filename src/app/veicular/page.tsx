'use client';  
  
import { useState, useEffect } from 'react';  
import AdForm from '@/components/ads/AdForm';  
import AdPreview from '@/components/ads/AdPreview';  
  
type Task = {  
  id: string;  
  nomeCompleto: string;  
  prefixo: string;  
  status: string;  
};  
  
type Ad = {  
  id: string;  
  titulo: string;  
  descricao?: string;  
  linkGerado: string;  
  status: string;  
  task: Task;  
};  
  
export default function VeicularPage() {  
  const [tasks, setTasks] = useState<Task[]>([]);  
  const [ads, setAds] = useState<Ad[]>([]);  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);  
  const [showForm, setShowForm] = useState(false);  
  const [editingAd, setEditingAd] = useState<Ad | null>(null);  
  
  useEffect(() => {  
    fetchTasks();  
    fetchAds();  
  }, []);  
  
  const fetchTasks = async () => {  
    const res = await fetch('/api/tasks');  
    const data = await res.json();  
    setTasks(data.filter((t: Task) => t.status === 'PRONTA_PARA_TESTES'));  
  };  
  
  const fetchAds = async () => {  
    const res = await fetch('/api/ads');  
    const data = await res.json();  
    setAds(data);  
  };  
  
  const handleCreateAd = (task: Task) => {  
    setSelectedTask(task);  
    setEditingAd(null);  
    setShowForm(true);  
  };  
  
  const handleEditAd = (ad: Ad) => {  
    setSelectedTask(ad.task);  
    setEditingAd(ad);  
    setShowForm(true);  
  };  
  
  const handleDeleteAd = async (id: string) => {  
    if (!confirm('Tem certeza que deseja deletar este anúncio?')) return;  
      
    await fetch(`/api/ads/${id}`, { method: 'DELETE' });  
    fetchAds();  
  };  
  
  const handleFormClose = () => {  
    setShowForm(false);  
    setSelectedTask(null);  
    setEditingAd(null);  
    fetchAds();  
  };  
  
  return (  
    <div className="p-8">  
      <h1 className="text-2xl font-bold mb-6">Veicular Anúncios</h1>  
  
      <div className="grid grid-cols-2 gap-6">  
        <div>  
          <h2 className="text-xl font-semibold mb-4">Tarefas Prontas</h2>  
          {tasks.length === 0 ? (  
            <p className="text-gray-500">Nenhuma tarefa pronta para veiculação</p>  
          ) : (  
            <div className="space-y-2">  
              {tasks.map(task => (  
                <div  
                  key={task.id}  
                  className="border p-4 rounded hover:shadow-md transition-shadow"  
                >  
                  <h3 className="font-bold">{task.nomeCompleto}</h3>  
                  <p className="text-sm text-gray-600">{task.prefixo}</p>  
                  <button  
                    onClick={() => handleCreateAd(task)}  
                    className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"  
                  >  
                    Criar Anúncio  
                  </button>  
                </div>  
              ))}  
            </div>  
          )}  
        </div>  
  
        <div>  
          <h2 className="text-xl font-semibold mb-4">Anúncios Criados</h2>  
          {ads.length === 0 ? (  
            <p className="text-gray-500">Nenhum anúncio criado ainda</p>  
          ) : (  
            <div className="space-y-2">  
              {ads.map(ad => (  
                <div  
                  key={ad.id}  
                  className="border p-4 rounded hover:shadow-md transition-shadow"  
                >  
                  <h3 className="font-bold">{ad.titulo}</h3>  
                  <p className="text-sm text-gray-600">{ad.task.nomeCompleto}</p>  
                  <p className="text-xs text-gray-500 mt-1 break-all">{ad.linkGerado}</p>  
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${  
                    ad.status === 'VEICULADO' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'  
                  }`}>  
                    {ad.status}  
                  </span>  
                  <div className="flex gap-2 mt-2">  
                    <button  
                      onClick={() => handleEditAd(ad)}  
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"  
                    >  
                      Editar  
                    </button>  
                    <button  
                      onClick={() => handleDeleteAd(ad.id)}  
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"  
                    >  
                      Deletar  
                    </button>  
                  </div>  
                </div>  
              ))}  
            </div>  
          )}  
        </div>  
      </div>  
  
      {showForm && selectedTask && (  
        <AdForm  
          task={selectedTask}  
          ad={editingAd}  
          onClose={handleFormClose}  
        />  
      )}  
    </div>  
  );  
}