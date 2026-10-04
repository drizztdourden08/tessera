/* @layer tooling-scripts @kind logic */
import { posix } from 'node:path';
import { isGlob } from '../config/is-glob.mjs';
import { nearestManifest } from '../cli/nearest-manifest.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { EXAMPLE_DIR } from './guide.constants.mjs';
import { partExport } from './part-export.mjs';

const exampleHome = (config, { kindDir, folder }) => {
  const views = config.parts.views[0];
  const viewsHome = isGlob(views) ? kindDir : views;
  const partPackage = nearestManifest(folder);
  const named = readManifest(partPackage).name !== undefined;
  if (!named || partPackage === nearestManifest(viewsHome)) return { dir: posix.join(viewsHome, EXAMPLE_DIR) };
  return { dir: posix.join(kindDir, EXAMPLE_DIR), ...partExport(partPackage, folder) };
};

export { exampleHome };
