/* @layer tooling-scripts @kind logic */
import { globSync } from 'node:fs';
import { isGlob } from '../config/is-glob.mjs';
import { posixPath } from '../config/posix-path.mjs';

const kindDirs = (config) => Object.entries(config.parts).flatMap(([kind, entries]) =>
  entries.flatMap((entry) => (isGlob(entry) ? globSync(entry).map(posixPath) : [entry])).map((dir) => ({ kind, dir })));

export { kindDirs };
