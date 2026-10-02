/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { WALK_SKIP } from './standards.constants.mjs';

const componentFolders = (dir) => {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  if (existsSync(join(dir, `${basename(dir)}.tsx`))) return [dir];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !WALK_SKIP.has(entry.name))
    .flatMap((entry) => componentFolders(join(dir, entry.name)));
};

export { componentFolders };
