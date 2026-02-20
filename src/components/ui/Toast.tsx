'use client';  
  
import { useEffect } from 'react';  
  
type ToastProps = {  
  message: string;  
  type?: 'success' | 'error' | 'warning' | 'info';  
  onClose: () => void;  
  duration?: number;  
};  
  
export default function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {  
  useEffect(() => {  
    const timer = setTimeout(onClose, duration);  
    return () => clearTimeout(timer);  
  }, [duration, onClose]);  
  
  const typeStyles = {  
    success: 'bg-green-500',  
    error: 'bg-red-500',  
    warning: 'bg-yellow-500',  
    info: 'bg-blue-500'  
  };  
  
  const icons = {  
    success: '✓',  
    error: '✕',  
    warning: '⚠',  
    info: 'ℹ'  
  };  
  
  return (  
    <div className={`fixed bottom-4 right-4 ${typeStyles[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50`}>  
      <span className="text-xl">{icons[type]}</span>  
      <p>{message}</p>  
      <button  
        onClick={onClose}  
        className="ml-4 hover:opacity-80 transition-opacity"  
      >  
        ✕  
      </button>  
    </div>  
  );  
}