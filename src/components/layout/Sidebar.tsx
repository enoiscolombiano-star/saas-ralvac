'use client';  
  
import Link from 'next/link';  
import { usePathname } from 'next/navigation';  
  
export default function Sidebar() {  
  const pathname = usePathname();  
  
  const links = [  
    { href: '/kanban', label: 'Kanban', icon: '📋' },  
    { href: '/definicoes', label: 'Definições', icon: '⚙️' },  
    { href: '/webhooks', label: 'Webhooks', icon: '🔗' },  
    { href: '/veicular', label: 'Veicular', icon: '📢' },  
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },  
    { href: '/auditoria', label: 'Auditoria', icon: '📝' },  
    { href: '/perfil', label: 'Perfil', icon: '👤' }  
  ];  
  
  return (  
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen">  
      <div className="p-6">  
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">  
          SAAS Ralvac  
        </h1>  
          
        <nav className="space-y-2">  
          {links.map((link) => {  
            const isActive = pathname === link.href;  
              
            return (  
              <Link  
                key={link.href}  
                href={link.href}  
                className={`  
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors  
                  ${isActive   
                    ? 'bg-blue-500 text-white'   
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'  
                  }  
                `}  
              >  
                <span className="text-xl">{link.icon}</span>  
                <span className="font-medium">{link.label}</span>  
              </Link>  
            );  
          })}  
        </nav>  
      </div>  
    </aside>  
  );  
}