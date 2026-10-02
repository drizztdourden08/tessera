/* @layer tooling-scripts @kind logic */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const readManifest = (dir) => {
  const file = dir === undefined ? undefined : join(dir, 'package.json');
  return file && existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
};

export { readManifest };
