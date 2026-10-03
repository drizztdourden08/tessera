/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { componentFolders } from './component-folders.mjs';
import { contentFindings } from './content-findings.mjs';
import { ownedBy } from './owned-by.mjs';
import { partDirs } from './part-dirs.mjs';
import { USAGE_REASON } from './standards.constants.mjs';

const missingUsage = (folder) => !existsSync(join(folder, `${basename(folder)}.usage.ts`));

const problemText = (error) => (error instanceof Error ? error.message : String(error));

const usageFileCheck = async ({ rootDir, packageDir }) => {
  try {
    const config = loadTesseraConfig(packageDir);
    if (!config) return [];
    const folders = partDirs(config).filter((dir) => ownedBy(dir, packageDir)).flatMap(componentFolders);
    const missing = folders.filter(missingUsage).map((folder) => `${posixPath(relative(rootDir, folder))}: missing ${basename(folder)}.usage.ts (${USAGE_REASON})`);
    const ownsTree = config.ai.tree !== undefined && ownedBy(config.ai.tree, packageDir);
    const content = folders.length > 0 || ownsTree ? await contentFindings(config, { rootDir, packageDir }) : [];
    return config.ai.usage === 'enforce' ? { findings: [...missing, ...content], notes: [] } : { findings: missing, notes: content };
  } catch (error) {
    return [problemText(error)];
  }
};

export { usageFileCheck };
