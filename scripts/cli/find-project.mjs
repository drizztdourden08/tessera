/* @layer tooling-scripts @kind logic */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PACKAGE_NAME } from './new.constants.mjs';

const nearestManifest = (dir) => {
  if (existsSync(join(dir, 'package.json'))) return dir;
  const parent = dirname(dir);
  return parent === dir ? undefined : nearestManifest(parent);
};

const usesTessera = (manifest) =>
  [manifest.dependencies, manifest.devDependencies, manifest.peerDependencies].some((deps) => Boolean(deps?.[PACKAGE_NAME]));

const findProject = (cwd) => {
  const root = nearestManifest(cwd);
  if (!root) return { problem: `no package.json in ${cwd} or above it` };
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  if (manifest.name === PACKAGE_NAME) return { root, mode: 'tessera', manifest };
  if (usesTessera(manifest)) return { root, mode: 'app', manifest };
  return {
    problem: `${join(root, 'package.json')} is not Tessera and does not list ${PACKAGE_NAME}. Run it in the Tessera repo or in the folder of the app whose package.json lists ${PACKAGE_NAME}`,
  };
};

export { findProject };
