/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { SRC_DIR, USAGE_SUFFIX } from './ai.constants.mjs';

const usageFilesIn = (root, dir) =>
  (existsSync(join(root, dir)) ? readdirSync(join(root, dir), { recursive: true }) : [])
    .map((file) => `${dir}/${posixPath(String(file))}`)
    .filter((file) => file.endsWith(USAGE_SUFFIX) && !file.includes('/node_modules/'));

const nameOf = (file) => file.slice(file.lastIndexOf('/') + 1, -USAGE_SUFFIX.length);

const usageSources = (root, components, { usageDir, dirs = [SRC_DIR] } = {}) => {
  const fixture = usageDir ? posixPath(relative(root, usageDir)) : undefined;
  const expected = new Map(components.map((c) => [fixture ? `${fixture}/${c.name}${USAGE_SUFFIX}` : c.usageFile, c.name]));
  const byName = new Map();
  const stray = [];
  for (const file of new Set((fixture ? [fixture] : dirs).flatMap((dir) => usageFilesIn(root, dir)))) {
    const name = expected.get(file);
    if (name) byName.set(name, file);
    else stray.push({ file, name: nameOf(file) });
  }
  return { byName, stray };
};

export { usageSources };
