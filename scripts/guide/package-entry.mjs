/* @layer tooling-scripts @kind logic */
import { posix } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { exportTarget } from './export-target.mjs';

const packageEntry = (dir) => {
  const manifest = readManifest(dir);
  const main = exportTarget(typeof manifest.exports === 'string' ? manifest.exports : manifest.exports?.['.']);
  return posix.join(posixPath(dir), main ?? manifest.types ?? manifest.main ?? 'src/index.ts');
};

export { packageEntry };
