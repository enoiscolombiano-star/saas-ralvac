'use client';  
  
import { useState, useEffect } from 'react';  
import AuditLogTable from '@/components/audit/AuditLogTable';  
import AuditFilters from '@/components/audit/AuditFilters';  
  
type AuditLog = {  
  id: string;  
  userId: string;  
  action: string;  
  entityType: string;  
  entityId: string;  
  changes: string | null;  
  criadoEm: Date;  
};  
  
export default function HistoricoPage() {  
  const [logs, setLogs] = useState<AuditLog[]>([]);  
  const [filters, setFilters] = useState({  
    userId: '',  
    entityType: '',  
    action: ''  
  });  
  
  useEffect(() => {  
    fetchLogs();  
  }, [filters]);  
  
  const fetchLogs = async () => {  
    const params = new URLSearchParams();  
    if (filters.userId) params.append('userId', filters.userId);  
    if (filters.entityType) params.append('entityType', filters.entityType);  
    if (filters.action) params.append('action', filters.action);  
  
    const res = await fetch(`/api/audit-logs?${params.toString()}`);  
    const data = await res.json();  
    setLogs(data);  
  };  
  
  return (  
    <div className="container mx-auto p-6">  
      <h1 className="text-3xl font-bold mb-6">Histórico de Auditoria</h1>  
  
      <AuditFilters filters={filters} onFilterChange={setFilters} />  
  
      <AuditLogTable logs={logs} />  
    </div>  
  );  
}