/* @layer tooling-scripts @kind logic */
import { join, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { PACKAGE_NAME } from '../cli/new.constants.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { ownedBy } from './owned-by.mjs';

const collect = async (config) => {
  if (readManifest(config.root).name === PACKAGE_NAME) return (await import('../ai/collect-ai.mjs')).collectAi(config.root);
  return (await import('../ai/collect-app.mjs')).collectApp(config);
};

const contentFindings = async (config, { rootDir, packageDir }) => {
  const model = await collect(config);
  const folderOf = new Map(model.components.map((c) => [c.name, c.folder]));
  return model.findings
    .filter((f) => f.kind !== 'missing-usage')
    .map((f) => ({ f, at: f.at ?? folderOf.get(f.name) }))
    .filter(({ at }) => at !== undefined && ownedBy(join(config.root, at), packageDir))
    .map(({ f, at }) => `${posixPath(relative(rootDir, join(config.root, at)))}: ${f.kind}: ${f.message}`);
};

export { contentFindings };
