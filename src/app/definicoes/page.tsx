'use client';  
  
import { useState, useEffect } from 'react';  
import DefinitionForm from '@/components/definitions/DefinitionForm';  
import UTMConfigForm from '@/components/definitions/UTMConfigForm';  
  
type Task = {  
  id: string;  
  nomeCompleto: string;  
  prefixo: string;  
};  
  
export default function DefinicoesPage() {  
  const [tasks, setTasks] = useState<Task[]>([]);  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);  
  const [showDefinitionForm, setShowDefinitionForm] = useState(false);  
  const [showUTMForm, setShowUTMForm] = useState(false);  
  
  useEffect(() => {  
    fetchTasks();  
  }, []);  
  
  const fetchTasks = async () => {  
    const res = await fetch('/api/tasks');  
    const data = await res.json();  
    setTasks(data);  
  };  
  
  return (  
    <div className="p-8">  
      <h1 className="text-2xl font-bold mb-6">Definições e Configurações</h1>  
  
      <div className="mb-6">  
        <h2 className="text-xl font-semibold mb-4">Selecionar Tarefa</h2>  
        <select  
          className="w-full border p-2 rounded"  
          onChange={(e) => {  
            const task = tasks.find(t => t.id === e.target.value);  
            setSelectedTask(task || null);  
          }}  
        >  
          <option value="">Selecione uma tarefa</option>  
          {tasks.map(task => (  
            <option key={task.id} value={task.id}>  
              {task.nomeCompleto} ({task.prefixo})  
            </option>  
          ))}  
        </select>  
      </div>  
  
      {selectedTask && (  
        <div className="grid grid-cols-2 gap-4">  
          <div className="border p-4 rounded">  
            <h3 className="font-bold mb-2">Definição da Tarefa</h3>  
            <button  
              onClick={() => setShowDefinitionForm(true)}  
              className="bg-blue-500 text-white px-4 py-2 rounded"  
            >  
              Configurar Definição  
            </button>  
          </div>  
  
          <div className="border p-4 rounded">  
            <h3 className="font-bold mb-2">Configuração UTM</h3>  
            <button  
              onClick={() => setShowUTMForm(true)}  
              className="bg-green-500 text-white px-4 py-2 rounded"  
            >  
              Configurar UTM  
            </button>  
          </div>  
        </div>  
      )}  
  
      {showDefinitionForm && selectedTask && (  
        <DefinitionForm  
          taskId={selectedTask.id}  
          onClose={() => setShowDefinitionForm(false)}  
        />  
      )}  
  
      {showUTMForm && selectedTask && (  
        <UTMConfigForm  
          taskId={selectedTask.id}  
          onClose={() => setShowUTMForm(false)}  
        />  
      )}  
    </div>  
  );  
}