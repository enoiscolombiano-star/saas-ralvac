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
  
// Estrutura M6 (exemplo)  
const structure = {  
  dirs: [  
    'src/app/api/auth',  
    'src/app/api/users',  
    'src/app/login'  
  ],  
  files: [  
    'src/app/api/auth/login/route.ts',  
    'src/app/api/users/route.ts',  
    'src/app/login/page.tsx'  
  ]  
};  
  
console.log('Criando estrutura...\n');  
structure.dirs.forEach(createDir);  
structure.files.forEach(createFile);  
console.log('\n✅ Estrutura criada com sucesso!');