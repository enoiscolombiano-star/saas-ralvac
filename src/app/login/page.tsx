'use client';  
  
import { useState } from 'react';  
import { useRouter } from 'next/navigation';  
import LoginForm from '@/components/auth/LoginForm';  
  
export default function LoginPage() {  
  const router = useRouter();  
  const [error, setError] = useState('');  
  
  const handleLogin = async (email: string, senha: string) => {  
    setError('');  
  
    const res = await fetch('/api/auth/login', {  
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify({ email, senha })  
    });  
  
    if (res.ok) {  
      const data = await res.json();  
      // Armazenar dados do usuário no localStorage  
      localStorage.setItem('user', JSON.stringify(data.user));  
      router.push('/kanban');  
    } else {  
      const data = await res.json();  
      setError(data.error || 'Erro ao fazer login');  
    }  
  };  
  
  return (  
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
      <div className="bg-white p-8 rounded-lg shadow-md w-96">  
        <h1 className="text-2xl font-bold mb-6 text-center">Login - SAAS Ralvac</h1>  
        {error && (  
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">  
            {error}  
          </div>  
        )}  
        <LoginForm onSubmit={handleLogin} />  
      </div>  
    </div>  
  );  
}