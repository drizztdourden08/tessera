/* @layer tooling-scripts @kind logic */
import { posixPath } from '../config/posix-path.mjs';

const folderKey = (folder) => {
  const path = posixPath(folder).replace(/\/+$/, '');
  return process.platform === 'win32' ? path.toLowerCase() : path;
};

export { folderKey };
