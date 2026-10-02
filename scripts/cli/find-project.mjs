/* @layer tooling-scripts @kind logic */
import { join } from 'node:path';
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { resolveConfig } from '../config/resolve-config.mjs';
import { PACKAGE_NAME } from './new.constants.mjs';
import { nearestManifest } from './nearest-manifest.mjs';
import { readManifest } from './read-manifest.mjs';
import { tesseraInstalled } from './tessera-installed.mjs';

const loadConfig = (cwd) => {
  try {
    return { config: loadTesseraConfig(cwd) };
  } catch (error) {
    return { problem: error instanceof Error ? error.message : String(error) };
  }
};

const configured = (cwd, config, manifestDir) => {
  const { root } = config;
  if (readManifest(root).name === PACKAGE_NAME) return { cwd, root, mode: 'tessera', manifest: readManifest(root), manifestDir: root, config };
  if (tesseraInstalled(manifestDir) || tesseraInstalled(root)) return { cwd, root, mode: 'app', manifest: readManifest(manifestDir), manifestDir: manifestDir ?? root, config };
  return { problem: `${config.file} names this repo, but ${PACKAGE_NAME} is not installed in ${manifestDir ?? cwd} or in ${root}. Add it to the app or to the repo root, then run it again` };
};

const unconfigured = (cwd, manifestDir) => {
  const manifest = readManifest(manifestDir);
  const root = posixPath(manifestDir);
  const project = { cwd, root, manifest, manifestDir: root, config: resolveConfig({}, { root }) };
  if (manifest.name === PACKAGE_NAME) return { ...project, mode: 'tessera' };
  if (tesseraInstalled(manifestDir)) return { ...project, mode: 'app', unconfigured: true };
  return {
    problem: `${join(manifestDir, 'package.json')} is not Tessera and does not list ${PACKAGE_NAME}. Run it in the Tessera repo or in the folder of the app whose package.json lists ${PACKAGE_NAME}`,
  };
};

const findProject = (cwd) => {
  const { config, problem } = loadConfig(cwd);
  if (problem) return { problem };
  const manifestDir = nearestManifest(cwd);
  if (config) return configured(cwd, config, manifestDir);
  if (!manifestDir) return { problem: `no package.json and no tessera.config.json in ${cwd} or above it` };
  return unconfigured(cwd, manifestDir);
};

export { findProject };
