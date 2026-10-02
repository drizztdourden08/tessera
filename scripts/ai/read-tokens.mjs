/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { posix } from 'node:path';
import { THEME_DIR } from './ai.constants.mjs';

const CSS_IMPORT = /import\s+'(\.{1,2}\/[^']+\.css)'/g;
const TOKEN_USE = /var\(\s*(--[\w-]+)/g;
const TOKEN_SET = /(?:^|[;{\s])(--[\w-]+)\s*:/g;

const filesIn = (root, folder) =>
  readdirSync(`${root}/${folder}`, { recursive: true }).map((file) => posix.join(folder, String(file).split('\\').join('/')));

const themeImports = (root, files) =>
  files.filter((file) => /\.tsx?$/.test(file)).flatMap((file) =>
    [...readFileSync(`${root}/${file}`, 'utf8').matchAll(CSS_IMPORT)]
      .map(([, spec]) => posix.join(posix.dirname(file), spec))
      .filter((path) => path.startsWith(`${THEME_DIR}/`) && existsSync(`${root}/${path}`)));

const readTokens = (root, folder) => {
  const files = filesIn(root, folder);
  const sheets = [...new Set([...files.filter((file) => file.endsWith('.css')), ...themeImports(root, files)])];
  const css = sheets.map((file) => readFileSync(`${root}/${file}`, 'utf8')).join('\n');
  const local = new Set([...css.matchAll(TOKEN_SET)].map(([, name]) => name));
  const used = [...css.matchAll(TOKEN_USE)].map(([, name]) => name).filter((name) => !local.has(name));
  return [...new Set(used)].sort();
};

export { readTokens };
