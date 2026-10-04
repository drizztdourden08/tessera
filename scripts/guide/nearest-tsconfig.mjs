/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';

const nearestTsconfig = (dir, root) => {
  const file = join(dir, 'tsconfig.json');
  if (existsSync(file)) return posixPath(file);
  const parent = dirname(dir);
  return parent === dir || relative(root, dir) === '' ? undefined : nearestTsconfig(parent, root);
};

export { nearestTsconfig };
