import fs from 'fs-extra';
const path = require('path');

const filesToEnsure = ['LICENSE.md', 'README.md', 'PUBLIC_DISCLOSURE.md'];
const templatesPath = path.join(__dirname, '../templates');

async function ensureFiles() {
  for (const filename of filesToEnsure) {
    const filePath = path.join(process.cwd(), filename);
    const templatePath = path.join(templatesPath, filename);

    if (!await fs.pathExists(filePath)) {
      console.log(`🔧 Creating missing ${filename}...`);
      await fs.copy(templatePath, filePath);
    } else {
      console.log(`✅ ${filename} exists.`);
    }
  }
}

ensureFiles();
