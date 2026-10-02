/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { nearestManifest } from '../cli/nearest-manifest.mjs';
import { componentFolders } from './component-folders.mjs';
import { partDirs } from './part-dirs.mjs';
import { USAGE_REASON } from './standards.constants.mjs';

const ownedBy = (dir, packageDir) => {
  const owner = nearestManifest(dir);
  return owner !== undefined && relative(owner, packageDir) === '';
};

const missingUsage = (folder) => !existsSync(join(folder, `${basename(folder)}.usage.ts`));

const usageFileCheck = ({ rootDir, packageDir }) => {
  try {
    const config = loadTesseraConfig(packageDir);
    if (!config) return [];
    return partDirs(config)
      .filter((dir) => ownedBy(dir, packageDir))
      .flatMap(componentFolders)
      .filter(missingUsage)
      .map((folder) => `${posixPath(relative(rootDir, folder))}: missing ${basename(folder)}.usage.ts (${USAGE_REASON})`);
  } catch (error) {
    return [error instanceof Error ? error.message : String(error)];
  }
};

export { usageFileCheck };
