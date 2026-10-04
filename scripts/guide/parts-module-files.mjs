/* @layer tooling-scripts @kind logic */
import { dirname, posix, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { nearestManifest } from '../cli/nearest-manifest.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { renderPartsModule } from './render-parts-module.mjs';

const keyOf = (root, file) => readManifest(nearestManifest(dirname(file))).name ?? (posix.dirname(posixPath(relative(root, file))) || '.');

const partsModuleFiles = (root, components) => {
  const byFile = new Map();
  for (const c of components) {
    const file = c.scope.guide.parts;
    if (file === undefined) continue;
    const entry = byFile.get(file) ?? { layer: c.scope.layer, names: new Set() };
    entry.names.add(c.name);
    byFile.set(file, entry);
  }
  return Object.fromEntries([...byFile].map(([file, { layer, names }]) => [
    posixPath(relative(root, file)),
    renderPartsModule({ key: keyOf(root, file), layer, names: [...names].sort((a, b) => a.localeCompare(b)) }),
  ]));
};

export { partsModuleFiles };
