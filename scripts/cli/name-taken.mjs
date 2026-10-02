/* @layer tooling-scripts @kind logic */
import { existsSync, globSync } from 'node:fs';
import { join, relative } from 'node:path';
import { isGlob } from '../config/is-glob.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { TESSERA_EXTRA_FOLDERS } from './new.constants.mjs';

const foldersOf = (project) => [
  ...Object.values(project.config.parts).flat(),
  ...(project.mode === 'tessera' ? TESSERA_EXTRA_FOLDERS.map((folder) => posixPath(join(project.root, folder))) : []),
];

const takenIn = (folder, name) => {
  if (isGlob(folder)) return globSync(`${folder}/${name}`)[0];
  return existsSync(join(folder, name)) ? join(folder, name) : undefined;
};

const nameTaken = (project, name) => {
  const taken = foldersOf(project).map((folder) => takenIn(folder, name)).find(Boolean);
  return taken ? `${posixPath(relative(project.root, taken))} already exists` : undefined;
};

export { nameTaken };
