'use client';  
  
import { useState, useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
  
type User = {  
  id: string;  
  nome: string;  
  email: string;  
  role: string;  
  ativo: boolean;  
};  
  
export default function PerfilPage() {  
  const router = useRouter();  
  const [user, setUser] = useState<User | null>(null);  
  const [editing, setEditing] = useState(false);  
  const [formData, setFormData] = useState({  
    nome: '',  
    email: '',  
    senha: ''  
  });  
  
  useEffect(() => {  
    const userData = localStorage.getItem('user');  
    if (!userData) {  
      router.push('/login');  
      return;  
    }  
  
    const parsedUser = JSON.parse(userData);  
    setUser(parsedUser);  
    setFormData({  
      nome: parsedUser.nome,  
      email: parsedUser.email,  
      senha: ''  
    });  
  }, [router]);  
  
  const handleUpdate = async () => {  
    if (!user) return;  
  
    const updateData: any = {  
      nome: formData.nome,  
      email: formData.email  
    };  
  
    if (formData.senha) {  
      updateData.senha = formData.senha;  
    }  
  
    const res = await fetch(`/api/users/${user.id}`, {  
      method: 'PATCH',  
      headers: {   
        'Content-Type': 'application/json',  
        'x-user-id': user.id,  
        'x-user-role': user.role  
      },  
      body: JSON.stringify(updateData)  
    });  
  
    if (res.ok) {  
      const updatedUser = await res.json();  
      localStorage.setItem('user', JSON.stringify(updatedUser));  
      setUser(updatedUser);  
      setEditing(false);  
      alert('Perfil atualizado com sucesso!');  
    } else {  
      alert('Erro ao atualizar perfil');  
    }  
  };  
  
  const handleLogout = async () => {  
    await fetch('/api/auth/logout', { method: 'POST' });  
    localStorage.removeItem('user');  
    router.push('/login');  
  };  
  
  if (!user) return <div>Carregando...</div>;  
  
  return (  
    <div className="p-8">  
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">  
        <div className="flex justify-between items-center mb-6">  
          <h1 className="text-2xl font-bold">Meu Perfil</h1>  
          <button  
            onClick={handleLogout}  
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"  
          >  
            Sair  
          </button>  
        </div>  
  
        {!editing ? (  
          <div>  
            <div className="mb-4">  
              <label className="block text-sm font-medium text-gray-700">Nome</label>  
              <p className="mt-1 text-lg">{user.nome}</p>  
            </div>  
  
            <div className="mb-4">  
              <label className="block text-sm font-medium text-gray-700">Email</label>  
              <p className="mt-1 text-lg">{user.email}</p>  
            </div>  
  
            <div className="mb-4">  
              <label className="block text-sm font-medium text-gray-700">Função</label>  
              <p className="mt-1 text-lg">{user.role}</p>  
            </div>  
  
            <button  
              onClick={() => setEditing(true)}  
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"  
            >  
              Editar Perfil  
            </button>  
          </div>  
        ) : (  
          <div>  
            <div className="mb-4">  
              <label className="block text-sm font-medium text-gray-700">Nome</label>  
              <input  
                type="text"  
                className="mt-1 w-full border p-2 rounded"  
                value={formData.nome}  
                onChange={e => setFormData({ ...formData, nome: e.target.value })}  
              />  
            </div>  
  
            <div className="mb-4">  
              <label className="block text-sm font-medium text-gray-700">Email</label>  
              <input  
                type="email"  
                className="mt-1 w-full border p-2 rounded"  
                value={formData.email}  
                onChange={e => setFormData({ ...formData, email: e.target.value })}  
              />  
            </div>  
  
            <div className="mb-4">  
              <label className="block text-sm font-medium text-gray-700">  
                Nova Senha (deixe em branco para não alterar)  
              </label>  
              <input  
                type="password"  
                className="mt-1 w-full border p-2 rounded"  
                value={formData.senha}  
                onChange={e => setFormData({ ...formData, senha: e.target.value })}  
                placeholder="••••••••"  
              />  
            </div>  
  
            <div className="flex gap-2">  
              <button  
                onClick={handleUpdate}  
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"  
              >  
                Salvar  
              </button>  
              <button  
                onClick={() => setEditing(false)}  
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"  
              >  
                Cancelar  
              </button>  
            </div>  
          </div>  
        )}  
      </div>  
    </div>  
  );  
}