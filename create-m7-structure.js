const fs = require('fs');  
const path = require('path');  
  
function createDir(dirPath) {  
  if (!fs.existsSync(dirPath)) {  
    fs.mkdirSync(dirPath, { recursive: true });  
    console.log(`✓ Criado: ${dirPath}`);  
  }  
}  
  
function createFile(filePath) {  
  const dir = path.dirname(filePath);  
  createDir(dir);  
    
  if (!fs.existsSync(filePath)) {  
    fs.writeFileSync(filePath, '');  
    console.log(`✓ Criado: ${filePath}`);  
  }  
}  
  
// Estrutura M7  
const structure = {  
  dirs: [  
    'src/app/api/audit-logs',  
    'src/app/historico',  
    'src/components/audit',  
    'src/lib/audit'  
  ],  
  files: [  
    'src/app/api/audit-logs/route.ts',  
    'src/app/historico/page.tsx',  
    'src/components/audit/AuditLogTable.tsx',  
    'src/components/audit/AuditFilters.tsx',  
    'src/lib/audit/logger.ts'  
  ]  
};  
  
console.log('Criando estrutura M7...\n');  
structure.dirs.forEach(createDir);  
structure.files.forEach(createFile);  
console.log('\n✅ Estrutura M7 criada com sucesso!');