/* @layer tooling-scripts @kind logic */
import { dirname, posix, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { nearestManifest } from '../cli/nearest-manifest.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { renderPartsModule } from './render-parts-module.mjs';

const keyOf = (root, file) => readManifest(nearestManifest(dirname(file))).name ?? (posix.dirname(posixPath(relative(root, file))) || '.');

const partsModuleFiles = (root, scopes, components) => {
  const byFile = new Map();
  for (const scope of scopes) {
    if (scope.guide.parts !== undefined && !byFile.has(scope.guide.parts)) byFile.set(scope.guide.parts, { layer: scope.layer, names: new Set() });
  }
  for (const c of components) byFile.get(c.scope.guide.parts)?.names.add(c.name);
  return Object.fromEntries([...byFile].map(([file, { layer, names }]) => [
    posixPath(relative(root, file)),
    renderPartsModule({ key: keyOf(root, file), layer, names: [...names].sort((a, b) => a.localeCompare(b)) }),
  ]));
};

export { partsModuleFiles };
