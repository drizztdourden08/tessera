/* @layer tooling-scripts @kind logic */
import { exampleHome } from '../guide/example-home.mjs';
import { absolutePath } from '../config/absolute-path.mjs';
import { importPath } from './import-path.mjs';
import { PACKAGE_NAME } from './new.constants.mjs';

const exampleImport = (project, { kindDir, folder }) => {
  if (project.mode === 'tessera') return PACKAGE_NAME;
  const place = { kindDir: absolutePath(project.root, kindDir), folder: absolutePath(project.root, folder) };
  const home = exampleHome(project.config, place);
  return home.from ?? importPath(home.dir, place.folder);
};

export { exampleImport };
