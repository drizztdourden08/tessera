/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { CONFIG_FILE } from './config.constants.mjs';
import { posixPath } from './posix-path.mjs';

const findTesseraConfig = (fromDir = process.cwd()) => {
  let dir = resolve(fromDir);
  for (;;) {
    const file = join(dir, CONFIG_FILE);
    if (existsSync(file)) return posixPath(file);
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
};

export { findTesseraConfig };
