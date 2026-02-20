'use client';  
  
import { useEffect } from 'react';  
import { useRouter } from 'next/navigation';  
  
type Props = {  
  children: React.ReactNode;  
  requiredRole?: 'ADMIN' | 'EDITOR' | 'VIEWER';  
};  
  
export default function ProtectedRoute({ children, requiredRole }: Props) {  
  const router = useRouter();  
  
  useEffect(() => {  
    const userData = localStorage.getItem('user');  
      
    if (!userData) {  
      router.push('/login');  
      return;  
    }  
  
    if (requiredRole) {  
      const user = JSON.parse(userData) as { role: 'ADMIN' | 'EDITOR' | 'VIEWER' };  // ADICIONADO: type assertion  
      const roleHierarchy: Record<'ADMIN' | 'EDITOR' | 'VIEWER', number> = {   
        ADMIN: 3,   
        EDITOR: 2,   
        VIEWER: 1   
      };  
        
      if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {  
        router.push('/');  
      }  
    }  
  }, [router, requiredRole]);  
  
  return <>{children}</>;  
}