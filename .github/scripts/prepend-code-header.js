import fs from 'fs-extra';
import path from 'path';

const headerPath = path.join(__dirname, '../templates/CODE_HEADER.txt');
const extensions = ['.cpp', '.py', '.sh', '.js'];

async function prependHeader() {
  const header = await fs.readFile(headerPath, 'utf8');
  
  const walk = async (dir) => {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await walk(fullPath);
      } else if (extensions.includes(path.extname(file))) {
        let content = await fs.readFile(fullPath, 'utf8');
        if (!content.includes('Hybrid authored under direct human oversight')) {
          console.log(`🔧 Prepending header to ${file}...`);
          await fs.writeFile(fullPath, header + '\n\n' + content);
        } else {
          console.log(`✅ Header already present in ${file}.`);
        }
      }
    }
  };

  await walk(process.cwd());
}

prependHeader();
