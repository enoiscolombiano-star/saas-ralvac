'use client';  
  
type Props = {  
  filters: {  
    userId: string;  
    entityType: string;  
    action: string;  
  };  
  onFilterChange: (filters: any) => void;  
};  
  
export default function AuditFilters({ filters, onFilterChange }: Props) {  
  const handleChange = (field: string, value: string) => {  
    onFilterChange({ ...filters, [field]: value });  
  };  
  
  return (  
    <div className="bg-white p-4 rounded-lg shadow mb-6">  
      <div className="grid grid-cols-3 gap-4">  
        <div>  
          <label className="block text-sm font-medium mb-2">Tipo de Entidade</label>  
          <select  
            className="w-full border p-2 rounded"  
            value={filters.entityType}  
            onChange={e => handleChange('entityType', e.target.value)}  
          >  
            <option value="">Todos</option>  
            <option value="Task">Tarefas</option>  
            <option value="Ad">Anúncios</option>  
            <option value="User">Usuários</option>  
            <option value="Webhook">Webhooks</option>  
          </select>  
        </div>  
  
        <div>  
          <label className="block text-sm font-medium mb-2">Ação</label>  
          <select  
            className="w-full border p-2 rounded"  
            value={filters.action}  
            onChange={e => handleChange('action', e.target.value)}  
          >  
            <option value="">Todas</option>  
            <option value="CREATE">Criar</option>  
            <option value="UPDATE">Atualizar</option>  
            <option value="DELETE">Deletar</option>  
          </select>  
        </div>  
  
        <div>  
          <label className="block text-sm font-medium mb-2">Usuário</label>  
          <input  
            type="text"  
            className="w-full border p-2 rounded"  
            placeholder="ID do usuário"  
            value={filters.userId}  
            onChange={e => handleChange('userId', e.target.value)}  
          />  
        </div>  
      </div>  
    </div>  
  );  
}