'use client';  
  
import { useState } from 'react';  
import Link from 'next/link';  
  
export default function Navbar() {  
  const [isOpen, setIsOpen] = useState(false);  
  
  const links = [  
    { href: '/kanban', label: 'Kanban' },  
    { href: '/definicoes', label: 'Definições' },  
    { href: '/webhooks', label: 'Webhooks' },  
    { href: '/veicular', label: 'Veicular' },  
    { href: '/dashboard', label: 'Dashboard' },  
    { href: '/auditoria', label: 'Auditoria' }  
  ];  
  
  return (  
    <nav className="bg-white shadow-md">  
      <div className="max-w-7xl mx-auto px-4">  
        <div className="flex justify-between items-center h-16">  
          {/* Logo */}  
          <Link href="/" className="text-xl font-bold text-blue-600">  
            SAAS Ralvac  
          </Link>  
  
          {/* Desktop Menu */}  
          <div className="hidden md:flex items-center gap-6">  
            {links.map(link => (  
              <Link  
                key={link.href}  
                href={link.href}  
                className="text-gray-700 hover:text-blue-600 transition-colors"  
              >  
                {link.label}  
              </Link>  
            ))}  
              
            <Link  
              href="/perfil"  
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"  
            >  
              Perfil  
            </Link>  
          </div>  
  
          {/* Mobile Menu Button */}  
          <button  
            onClick={() => setIsOpen(!isOpen)}  
            className="md:hidden text-gray-700"  
          >  
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
              {isOpen ? (  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
              ) : (  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />  
              )}  
            </svg>  
          </button>  
        </div>  
  
        {/* Mobile Menu */}  
        {isOpen && (  
          <div className="md:hidden py-4 border-t">  
            {links.map(link => (  
              <Link  
                key={link.href}  
                href={link.href}  
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"  
                onClick={() => setIsOpen(false)}  
              >  
                {link.label}  
              </Link>  
            ))}  
            <Link  
              href="/perfil"  
              className="block mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"  
              onClick={() => setIsOpen(false)}  
            >  
              Perfil  
            </Link>  
          </div>  
        )}  
      </div>  
    </nav>  
  );  
}