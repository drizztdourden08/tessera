/* @layer tooling-scripts @kind logic */
import { posix } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { exportTarget } from './export-target.mjs';
import { packageEntry } from './package-entry.mjs';
import { specifierOf } from './specifier-of.mjs';

const CODE_FILE = /\.[cm]?[jt]sx?$/;

const codeExports = (exports) => {
  if (typeof exports === 'string') return [['.', exports]];
  return Object.entries(exports ?? {}).flatMap(([key, target]) => {
    const file = exportTarget(target);
    return key.startsWith('.') && !key.includes('*') && typeof file === 'string' && CODE_FILE.test(file) ? [[key, file]] : [];
  });
};

const holds = (dir, folder) => folder === dir || folder.startsWith(`${dir}/`);

const partExport = (packageDir, folder) => {
  const dir = posixPath(packageDir);
  const manifest = readManifest(packageDir);
  const holders = codeExports(manifest.exports)
    .map(([key, file]) => ({ key, entry: posix.join(dir, file) }))
    .filter(({ entry }) => holds(posix.dirname(entry), posixPath(folder)))
    .sort((a, b) => posix.dirname(b.entry).length - posix.dirname(a.entry).length);
  const { key, entry } = holders[0] ?? { key: '.', entry: packageEntry(packageDir) };
  return { from: specifierOf(manifest.name, key), entry };
};

export { partExport };
