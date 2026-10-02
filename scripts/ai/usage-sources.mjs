/* @layer tooling-scripts @kind logic */
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SRC_DIR, USAGE_SUFFIX } from './ai.constants.mjs';

const usageFilesIn = (root, dir) =>
  readdirSync(join(root, dir), { recursive: true })
    .map((file) => `${dir}/${String(file).split('\\').join('/')}`)
    .filter((file) => file.endsWith(USAGE_SUFFIX));

const nameOf = (file) => file.slice(file.lastIndexOf('/') + 1, -USAGE_SUFFIX.length);

const usageSources = (root, components, usageDir) => {
  const dir = usageDir ? relative(root, usageDir).split('\\').join('/') : SRC_DIR;
  const expected = new Map(components.map((c) => [usageDir ? `${dir}/${c.name}${USAGE_SUFFIX}` : c.usageFile, c.name]));
  const byName = new Map();
  const stray = [];
  for (const file of usageFilesIn(root, dir)) {
    const name = expected.get(file);
    if (name) byName.set(name, file);
    else stray.push({ file, name: nameOf(file) });
  }
  return { byName, stray };
};

export { usageSources };
