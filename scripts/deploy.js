const fs = require('node:fs');
const path = require('node:path');

const source = path.resolve(__dirname, '..', 'dist', 'browser');
const destination = 'C:\\xampp82\\htdocs\\comic-stack';

if (!fs.statSync(source, { throwIfNoEntry: false })?.isDirectory()) {
  throw new Error(`Build output directory not found: ${source}`);
}

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });

for (const entry of fs.readdirSync(source)) {
  fs.cpSync(path.join(source, entry), path.join(destination, entry), {
    recursive: true,
  });
}
