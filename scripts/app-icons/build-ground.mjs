/* @layer tooling-scripts @kind logic */
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { groundDir } from './ground-dir.mjs';
import { ladder } from './app-files.mjs';
import { artFile } from './art.mjs';

const buildGround = async ({ root, write, loaded }, id, ground, art) => {
  const dir = groundDir(ground);
  rmSync(join(root, 'brand', dir, id), { recursive: true, force: true });
  const files = { ladder: (size) => `${dir}/${id}/mark/mark-${size}.png`, ico: null };
  return [
    write(`${dir}/${id}.svg`, artFile(art.mark, loaded.family[id].name)),
    ...await ladder(write, art.artAt, files, loaded.sizes),
  ];
};

export { buildGround };
