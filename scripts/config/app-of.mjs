/* @layer tooling-scripts @kind logic */
import { isAbsolute, relative, resolve } from 'node:path';

const inside = (dir, folder) => {
  const path = relative(folder, dir);
  return path === '' || (!path.startsWith('..') && !isAbsolute(path));
};

const appOf = (apps, root, fromDir) => {
  const dir = resolve(fromDir);
  const matches = Object.keys(apps ?? {}).filter((app) => inside(dir, resolve(root, app)));
  return matches.sort((a, b) => resolve(root, b).length - resolve(root, a).length)[0];
};

export { appOf };
