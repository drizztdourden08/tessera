/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { FOLDERS } from './new.constants.mjs';

const TESSERA_FOLDERS = ['src/primitives', 'src/composites', 'src/brand'];

const nameTaken = (project, name) => {
  const folders = project.mode === 'tessera' ? TESSERA_FOLDERS : Object.values(FOLDERS);
  const taken = folders.find((folder) => existsSync(join(project.root, folder, name)));
  return taken ? `${taken}/${name} already exists` : undefined;
};

export { nameTaken };
