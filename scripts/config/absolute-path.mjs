/* @layer tooling-scripts @kind logic */
import { resolve } from 'node:path';
import { posixPath } from './posix-path.mjs';

const absolutePath = (root, path) => posixPath(resolve(root, path));

export { absolutePath };
