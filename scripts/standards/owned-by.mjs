/* @layer tooling-scripts @kind logic */
import { relative } from 'node:path';
import { nearestManifest } from '../cli/nearest-manifest.mjs';

const ownedBy = (dir, packageDir) => {
  const owner = nearestManifest(dir);
  return owner !== undefined && relative(owner, packageDir) === '';
};

export { ownedBy };
