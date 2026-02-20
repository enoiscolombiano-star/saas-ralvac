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
  
// Estrutura M8  
const structure = {  
  dirs: [  
    'src/components/common',  
    'src/components/layout',  
    'src/lib/utils',  
    'src/hooks'  
  ],  
  files: [  
    'src/components/common/LoadingSpinner.tsx',  
    'src/components/common/ErrorBoundary.tsx',  
    'src/components/common/Toast.tsx',  
    'src/components/layout/Navbar.tsx',  
    'src/components/layout/Sidebar.tsx',  
    'src/lib/utils/formatters.ts',  
    'src/lib/utils/validators.ts',  
    'src/hooks/useToast.ts',  
    'src/hooks/usePagination.ts'  
  ]  
};  
  
// Criar estrutura  
structure.dirs.forEach(createDir);  
structure.files.forEach(createFile);  
  
console.log('\n✅ Estrutura M8 criada com sucesso!');