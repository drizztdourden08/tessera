/* @layer tooling-scripts @kind logic */
import { posix } from 'node:path';
import { isGlob } from '../config/is-glob.mjs';
import { nearestManifest } from '../cli/nearest-manifest.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { EXAMPLE_DIR } from './ai.constants.mjs';

const inPackage = (config, folder) => config.package !== undefined && readManifest(nearestManifest(folder)).name === config.package;

const exampleHome = (config, { kindDir, folder }) => {
  if (inPackage(config, folder)) return { dir: posix.join(kindDir, EXAMPLE_DIR), from: config.package };
  const views = config.parts.views[0];
  return { dir: posix.join(isGlob(views) ? kindDir : views, EXAMPLE_DIR) };
};

export { exampleHome };
