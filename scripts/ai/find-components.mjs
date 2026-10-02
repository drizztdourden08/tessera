/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import { SKIPPED_FOLDERS, SRC_DIR, TIER_ORDER, USAGE_SUFFIX } from './ai.constants.mjs';

const posix = (path) => path.split('\\').join('/');

const tierRank = (tier) => {
  const rank = TIER_ORDER.indexOf(tier);
  return rank === -1 ? TIER_ORDER.length : rank;
};

const componentAt = (root, dir) => {
  const name = basename(dir);
  const folder = posix(relative(root, dir));
  return { name, tier: folder.split('/')[1], folder, file: `${folder}/${name}.tsx`, usageFile: `${folder}/${name}${USAGE_SUFFIX}` };
};

const walk = (root, dir, found) => {
  if (existsSync(join(dir, `${basename(dir)}.tsx`))) {
    found.push(componentAt(root, dir));
    return;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !SKIPPED_FOLDERS.includes(entry.name)) walk(root, join(dir, entry.name), found);
  }
};

const findComponents = (root) => {
  const found = [];
  walk(root, join(root, SRC_DIR), found);
  return found.sort((a, b) => tierRank(a.tier) - tierRank(b.tier) || a.name.localeCompare(b.name));
};

export { findComponents };
