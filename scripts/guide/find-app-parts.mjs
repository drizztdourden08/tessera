/* @layer tooling-scripts @kind logic */
import { basename, dirname, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { componentFolders } from '../standards/component-folders.mjs';
import { kindDirs } from '../standards/kind-dirs.mjs';
import { folderKey } from './folder-key.mjs';
import { APP_TIER_ORDER, USAGE_SUFFIX } from './guide.constants.mjs';

const partAt = (root, scope, kind, dir) => {
  const name = basename(dir);
  const folder = posixPath(relative(root, dir));
  return { name, tier: kind, folder, kindDir: posixPath(dirname(dir)), file: `${folder}/${name}.tsx`, usageFile: `${folder}/${name}${USAGE_SUFFIX}`, scope };
};

const findAppParts = (root, scopes) => {
  const byFolder = new Map();
  const found = scopes.flatMap((scope) => kindDirs(scope).flatMap(({ kind, dir }) => componentFolders(dir).map((folder) => ({ scope, kind, folder: posixPath(folder) }))));
  for (const { scope, kind, folder } of found) if (!byFolder.has(folderKey(folder))) byFolder.set(folderKey(folder), partAt(root, scope, kind, folder));
  return [...byFolder.values()].sort((a, b) => APP_TIER_ORDER.indexOf(a.tier) - APP_TIER_ORDER.indexOf(b.tier) || a.name.localeCompare(b.name));
};

export { findAppParts };
