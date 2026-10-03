/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { PACKAGE_NAME } from '../cli/new.constants.mjs';

const tesseraAiFolder = (from, root) => {
  const folder = join(from, 'node_modules', PACKAGE_NAME, 'ai');
  if (existsSync(folder)) return posixPath(folder);
  const parent = dirname(from);
  if (parent === from || relative(root, from) === '') return posixPath(join(root, 'node_modules', PACKAGE_NAME, 'ai'));
  return tesseraAiFolder(parent, root);
};

export { tesseraAiFolder };
