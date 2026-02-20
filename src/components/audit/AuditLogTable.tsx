'use client';  
  
type AuditLog = {  
  id: string;  
  userId: string;  
  action: string;  
  entityType: string;  
  entityId: string;  
  changes: string | null;  
  criadoEm: Date;  
};  
  
type Props = {  
  logs: AuditLog[];  
};  
  
export default function AuditLogTable({ logs }: Props) {  
  return (  
    <div className="bg-white rounded-lg shadow overflow-hidden">  
      <table className="min-w-full divide-y divide-gray-200">  
        <thead className="bg-gray-50">  
          <tr>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Data/Hora  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Usuário  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Ação  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Entidade  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              ID  
            </th>  
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">  
              Mudanças  
            </th>  
          </tr>  
        </thead>  
        <tbody className="bg-white divide-y divide-gray-200">  
          {logs.map((log) => (  
            <tr key={log.id}>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                {new Date(log.criadoEm).toLocaleString('pt-BR')}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                {log.userId}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap">  
                <span className={`px-2 py-1 text-xs rounded ${  
                  log.action === 'CREATE' ? 'bg-green-100 text-green-800' :  
                  log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' :  
                  'bg-red-100 text-red-800'  
                }`}>  
                  {log.action}  
                </span>  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">  
                {log.entityType}  
              </td>  
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                {log.entityId}  
              </td>  
              <td className="px-6 py-4 text-sm text-gray-500">  
                {log.changes ? (  
                  <details>  
                    <summary className="cursor-pointer text-blue-600">Ver mudanças</summary>  
                    <pre className="mt-2 text-xs bg-gray-50 p-2 rounded">  
                      {JSON.stringify(JSON.parse(log.changes), null, 2)}  
                    </pre>  
                  </details>  
                ) : (  
                  '-'  
                )}  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
}