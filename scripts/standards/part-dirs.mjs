/* @layer tooling-scripts @kind logic */
import { kindDirs } from './kind-dirs.mjs';

const partDirs = (config) => [...new Set(kindDirs(config).map((entry) => entry.dir))];

export { partDirs };
