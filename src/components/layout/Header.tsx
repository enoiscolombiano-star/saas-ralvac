'use client';  
  
import { useState, useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
  
export default function Header() {  
  const router = useRouter();  
  const [user, setUser] = useState<any>(null);  
  
  useEffect(() => {  
    const userData = localStorage.getItem('user');  
    if (userData) {  
      setUser(JSON.parse(userData));  
    }  
  }, []);  
  
  const handleLogout = () => {  
    localStorage.removeItem('user');  
    localStorage.removeItem('token');  
    router.push('/login');  
  };  
  
  return (  
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">  
      <div className="flex items-center justify-between">  
        <div className="flex items-center gap-4">  
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">  
            Dashboard  
          </h2>  
        </div>  
  
        {user && (  
          <div className="flex items-center gap-4">  
            <div className="text-right">  
              <p className="text-sm font-medium text-gray-900 dark:text-white">  
                {user.nome}  
              </p>  
              <p className="text-xs text-gray-500 dark:text-gray-400">  
                {user.role}  
              </p>  
            </div>  
              
            <button  
              onClick={handleLogout}  
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"  
            >  
              Sair  
            </button>  
          </div>  
        )}  
      </div>  
    </header>  
  );  
}