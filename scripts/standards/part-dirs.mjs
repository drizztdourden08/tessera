/* @layer tooling-scripts @kind logic */
import { globSync } from 'node:fs';
import { isGlob } from '../config/is-glob.mjs';
import { posixPath } from '../config/posix-path.mjs';

const partDirs = (config) => [...new Set(Object.values(config.parts).flat()
  .flatMap((entry) => (isGlob(entry) ? globSync(entry).map(posixPath) : [entry])))];

export { partDirs };
