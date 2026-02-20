'use client';  
  
import { useState, useEffect } from 'react';  
import AuditLogTable from '@/components/audit/AuditLogTable';  
import AuditFilters from '@/components/audit/AuditFilters';  
  
type AuditLog = {  
  id: string;  
  action: string;  
  entityType: string;  
  entityId?: string;  
  changes?: string;  
  ipAddress?: string;  
  criadoEm: string;  
  user?: {  
    nome: string;  
    email: string;  
  };  
};  
  
export default function HistoricoPage() {  
  const [logs, setLogs] = useState<AuditLog[]>([]);  
  const [filters, setFilters] = useState({  
    userId: '',  
    entityType: '',  
    action: ''  
  });  
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {  
    fetchLogs();  
  }, [filters]);  
  
  const fetchLogs = async () => {  
    setLoading(true);  
      
    const params = new URLSearchParams();  
    if (filters.userId) params.append('userId', filters.userId);  
    if (filters.entityType) params.append('entityType', filters.entityType);  
    if (filters.action) params.append('action', filters.action);  
  
    const res = await fetch(`/api/audit-logs?${params.toString()}`);  
    const data = await res.json();  
      
    setLogs(data);  
    setLoading(false);  
  };  
  
  return (  
    <div className="p-8">  
      <h1 className="text-2xl font-bold mb-6">Histórico de Auditoria</h1>  
  
      <AuditFilters   
        filters={filters}  
        onFilterChange={setFilters}  
      />  
  
      {loading ? (  
        <div className="text-center py-8">Carregando...</div>  
      ) : (  
        <AuditLogTable logs={logs} />  
      )}  
    </div>  
  );  
}