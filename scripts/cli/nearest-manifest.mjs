/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const nearestManifest = (dir) => {
  const here = resolve(dir);
  if (existsSync(join(here, 'package.json'))) return here;
  const parent = dirname(here);
  return parent === here ? undefined : nearestManifest(parent);
};

export { nearestManifest };
