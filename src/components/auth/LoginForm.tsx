'use client';  
  
import { useState } from 'react';  
  
type Props = {  
  onSubmit: (email: string, senha: string) => void;  
};  
  
export default function LoginForm({ onSubmit }: Props) {  
  const [email, setEmail] = useState('');  
  const [senha, setSenha] = useState('');  
  
  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault();  
    onSubmit(email, senha);  
  };  
  
  return (  
    <form onSubmit={handleSubmit}>  
      <div className="mb-4">  
        <label className="block text-sm font-medium text-gray-700 mb-2">  
          Email  
        </label>  
        <input  
          type="email"  
          className="w-full border p-2 rounded"  
          value={email}  
          onChange={e => setEmail(e.target.value)}  
          required  
        />  
      </div>  
  
      <div className="mb-6">  
        <label className="block text-sm font-medium text-gray-700 mb-2">  
          Senha  
        </label>  
        <input  
          type="password"  
          className="w-full border p-2 rounded"  
          value={senha}  
          onChange={e => setSenha(e.target.value)}  
          required  
        />  
      </div>  
  
      <button  
        type="submit"  
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"  
      >  
        Entrar  
      </button>  
    </form>  
  );  
}