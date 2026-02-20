'use client';  
  
type LoadingProps = {  
  size?: 'sm' | 'md' | 'lg';  
  fullScreen?: boolean;  
};  
  
export default function Loading({ size = 'md', fullScreen = false }: LoadingProps) {  
  const sizeStyles = {  
    sm: 'w-6 h-6',  
    md: 'w-12 h-12',  
    lg: 'w-16 h-16'  
  };  
  
  const spinner = (  
    <div className={`${sizeStyles[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`} />  
  );  
  
  if (fullScreen) {  
    return (  
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">  
        {spinner}  
      </div>  
    );  
  }  
  
  return (  
    <div className="flex items-center justify-center p-8">  
      {spinner}  
    </div>  
  );  
}