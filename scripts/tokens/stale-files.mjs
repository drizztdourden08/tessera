/* @layer tooling-scripts @kind logic */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const unix = (text) => text.replace(/\r\n/g, '\n');

const staleFiles = (root, files) =>
  Object.entries(files)
    .filter(([path, content]) => !existsSync(join(root, path)) || unix(readFileSync(join(root, path), 'utf8')) !== unix(content))
    .map(([path]) => path);

export { staleFiles };
