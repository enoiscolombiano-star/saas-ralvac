'use client';  
  
type AuditLog = {  
  id: string;  
  action: string;  
  entityType: string;  
  entityId: string;  
  changes: any;  
  criadoEm: Date;  
  // REMOVIDO: userId (não existe no tipo)  
};  
  
type Props = {  
  logs: AuditLog[];  
};  
  
export default function AuditLogTable({ logs }: Props) {  
  const formatDate = (date: Date) => {  
    return new Date(date).toLocaleString('pt-BR');  
  };  
  
  const getActionLabel = (action: string) => {  
    const labels: Record<string, string> = {  
      CREATE: 'Criar',  
      UPDATE: 'Atualizar',  
      DELETE: 'Deletar'  
    };  
    return labels[action] || action;  
  };  
  
  const getEntityLabel = (entityType: string) => {  
    const labels: Record<string, string> = {  
      Task: 'Tarefa',  
      Ad: 'Anúncio',  
      User: 'Usuário',  
      Webhook: 'Webhook'  
    };  
    return labels[entityType] || entityType;  
  };  
  
  return (  
    <div className="bg-white rounded-lg shadow overflow-hidden">  
      <table className="min-w-full divide-y divide-gray-200">  
        <thead className="bg-gray-50">  
          <tr>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Data/Hora  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Ação  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Tipo  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              ID da Entidade  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Mudanças  
            </th>  
          </tr>  
        </thead>  
        <tbody className="bg-white divide-y divide-gray-200">  
          {logs.map(log => (  
            <tr key={log.id}>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                {formatDate(log.criadoEm)}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap">  
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">  
                  {getActionLabel(log.action)}  
                </span>  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                {getEntityLabel(log.entityType)}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">  
                {log.entityId.substring(0, 8)}...  
              </td>  
              <td className="px-6 py-4 text-sm text-gray-500">  
                <details>  
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">  
                    Ver detalhes  
                  </summary>  
                  <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40">  
                    {JSON.stringify(log.changes, null, 2)}  
                  </pre>  
                </details>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
  
      {logs.length === 0 && (  
        <div className="text-center py-8 text-gray-500">  
          Nenhum registro de auditoria encontrado  
        </div>  
      )}  
    </div>  
  );  
}