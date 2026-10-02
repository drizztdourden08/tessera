/* @layer tooling-scripts @kind logic */
import { join, posix, relative } from 'node:path';
import { isGlob } from '../config/is-glob.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { importPath } from './import-path.mjs';
import { nearestManifest } from './nearest-manifest.mjs';
import { PACKAGE_NAME } from './new.constants.mjs';
import { readManifest } from './read-manifest.mjs';

const inPackage = (project, folder) =>
  project.config.package !== undefined && readManifest(nearestManifest(join(project.root, folder))).name === project.config.package;

const viewFolder = (project, kindDir) => {
  const views = project.config.parts.views[0];
  return isGlob(views) ? kindDir : posixPath(relative(project.root, views));
};

const exampleImport = (project, { kindDir, folder }) => {
  if (project.mode === 'tessera') return PACKAGE_NAME;
  if (inPackage(project, folder)) return project.config.package;
  return importPath(posix.join(viewFolder(project, kindDir), 'View'), folder);
};

export { exampleImport };
