'use client';  
  
type Props = {  
  title: string;  
  value: string;  
  subtitle?: string;  
  icon?: string;  
};  
  
export default function MetricsCard({ title, value, subtitle, icon }: Props) {  
  return (  
    <div className="bg-white border rounded-lg p-4 shadow-sm">  
      <div className="flex items-center justify-between mb-2">  
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>  
        {icon && <span className="text-2xl">{icon}</span>}  
      </div>  
      <p className="text-2xl font-bold text-gray-900">{value}</p>  
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}  
    </div>  
  );  
}