/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { HOOK_TIERS, SKIPPED_FOLDERS, SRC_DIR, USAGE_SUFFIX } from './guide.constants.mjs';

const isModuleFolder = (name) => /^[a-z]/.test(name) && !SKIPPED_FOLDERS.includes(name);

const reExports = (root, tier, folder) => {
  const index = `${root}/${SRC_DIR}/${tier}/index.ts`;
  return existsSync(index) && readFileSync(index, 'utf8').includes(`from './${folder}'`);
};

const moduleAt = (tier, name) => {
  const folder = `${SRC_DIR}/${tier}/${name}`;
  return { name, kind: 'hooks', tier, folder, file: `${folder}/index.ts`, usageFile: `${folder}/${name}${USAGE_SUFFIX}` };
};

const foldersOf = (root, tier) => (existsSync(`${root}/${SRC_DIR}/${tier}`) ? readdirSync(`${root}/${SRC_DIR}/${tier}`, { withFileTypes: true }) : []);

const findHookModules = (root) =>
  HOOK_TIERS.flatMap((tier) => foldersOf(root, tier)
    .filter((entry) => entry.isDirectory() && isModuleFolder(entry.name))
    .filter((entry) => existsSync(`${root}/${SRC_DIR}/${tier}/${entry.name}/index.ts`) && reExports(root, tier, entry.name))
    .map((entry) => moduleAt(tier, entry.name)));

export { findHookModules };
