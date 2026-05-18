import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const indexHtml = resolve(distDir, 'index.html');
const fallbackHtml = resolve(distDir, '404.html');
const noJekyll = resolve(distDir, '.nojekyll');

copyFileSync(indexHtml, fallbackHtml);
writeFileSync(noJekyll, '');
