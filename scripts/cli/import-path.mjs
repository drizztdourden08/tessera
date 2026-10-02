/* @layer tooling-scripts @kind logic */
import { posix } from 'node:path';

const importPath = (fromDir, toPath) => {
  const path = posix.relative(fromDir, toPath);
  return path.startsWith('.') ? path : `./${path}`;
};

export { importPath };
