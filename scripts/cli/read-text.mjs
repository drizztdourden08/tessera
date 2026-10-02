/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const readText = (root, path) => {
  const raw = readFileSync(join(root, path), 'utf8');
  return { text: raw.replace(/\r\n/g, '\n'), eol: raw.includes('\r\n') ? '\r\n' : '\n' };
};

export { readText };
