'use client';  
  
import { useState, useEffect } from 'react';  
  
type Task = {  
  id: string;  
  nomeCompleto: string;  
  prefixo: string;  
  status: 'CRIADA' | 'EM_PRODUCAO' | 'PRONTA_PARA_TESTES';  
  criadoPor?: string;  
  comQuem?: string;  
  prazo?: string;  
};  
  
export default function KanbanPage() {  
  const [tasks, setTasks] = useState<Task[]>([]);  
  const [showForm, setShowForm] = useState(false);  
  
  useEffect(() => {  
    fetchTasks();  
  }, []);  
  
  const fetchTasks = async () => {  
    const res = await fetch('/api/tasks');  
    const data = await res.json();  
    setTasks(data);  
  };  
  
  const createTask = async (data: Partial<Task>) => {  
    await fetch('/api/tasks', {  
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify(data)  
    });  
    fetchTasks();  
    setShowForm(false);  
  };  
  
  const updateTaskStatus = async (id: string, status: Task['status']) => {  
    await fetch(`/api/tasks/${id}`, {  
      method: 'PATCH',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify({ status })  
    });  
    fetchTasks();  
  };  
  
  const deleteTask = async (id: string) => {  
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });  
    fetchTasks();  
  };  
  
  const columns = [  
    { status: 'CRIADA', title: 'Criada' },  
    { status: 'EM_PRODUCAO', title: 'Em Produção' },  
    { status: 'PRONTA_PARA_TESTES', title: 'Pronta para Testes' }  
  ];  
  
  return (  
    <div className="p-8">  
      <div className="flex justify-between mb-6">  
        <h1 className="text-2xl font-bold">Kanban - Tarefas</h1>  
        <button  
          onClick={() => setShowForm(true)}  
          className="bg-blue-500 text-white px-4 py-2 rounded"  
        >  
          Nova Tarefa  
        </button>  
      </div>  
  
      <div className="grid grid-cols-3 gap-4">  
        {columns.map(column => (  
          <div key={column.status} className="bg-gray-100 p-4 rounded">  
            <h2 className="font-bold mb-4">{column.title}</h2>  
            {tasks  
              .filter(task => task.status === column.status)  
              .map(task => (  
                <TaskCard  
                  key={task.id}  
                  task={task}  
                  onStatusChange={updateTaskStatus}  
                  onDelete={deleteTask}  
                />  
              ))}  
          </div>  
        ))}  
      </div>  
  
      {showForm && (  
        <TaskForm  
          onSubmit={createTask}  
          onCancel={() => setShowForm(false)}  
        />  
      )}  
    </div>  
  );  
}  
  
function TaskCard({ task, onStatusChange, onDelete }: any) {  
  return (  
    <div className="bg-white p-4 mb-2 rounded shadow">  
      <h3 className="font-bold">{task.nomeCompleto}</h3>  
      <p className="text-sm text-gray-600">{task.prefixo}</p>  
      {task.criadoPor && <p className="text-xs">Criado por: {task.criadoPor}</p>}  
      <div className="mt-2 flex gap-2">  
        <button  
          onClick={() => onDelete(task.id)}  
          className="text-red-500 text-sm"  
        >  
          Deletar  
        </button>  
      </div>  
    </div>  
  );  
}  
  
function TaskForm({ onSubmit, onCancel }: any) {  
  const [data, setData] = useState({ nomeCompleto: '', prefixo: '', criadoPor: '' });  
  
  return (  
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">  
      <div className="bg-white p-6 rounded w-96">  
        <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>  
        <input  
          placeholder="Nome Completo"  
          className="w-full border p-2 mb-2"  
          value={data.nomeCompleto}  
          onChange={e => setData({ ...data, nomeCompleto: e.target.value })}  
        />  
        <input  
          placeholder="Prefixo"  
          className="w-full border p-2 mb-2"  
          value={data.prefixo}  
          onChange={e => setData({ ...data, prefixo: e.target.value })}  
        />  
        <input  
          placeholder="Criado Por"  
          className="w-full border p-2 mb-4"  
          value={data.criadoPor}  
          onChange={e => setData({ ...data, criadoPor: e.target.value })}  
        />  
        <div className="flex gap-2">  
          <button  
            onClick={() => onSubmit(data)}  
            className="bg-blue-500 text-white px-4 py-2 rounded"  
          >  
            Criar  
          </button>  
          <button  
            onClick={onCancel}  
            className="bg-gray-300 px-4 py-2 rounded"  
          >  
            Cancelar  
          </button>  
        </div>  
      </div>  
    </div>  
  );  
}