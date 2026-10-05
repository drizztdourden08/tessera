/* @layer tooling-scripts @kind logic */
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { DARK_GROUND_DIR } from './app-icons.constants.mjs';
import { ladder } from './app-files.mjs';
import { artFile } from './art.mjs';

const buildDarkGround = async ({ root, write, loaded }, id, art) => {
  rmSync(join(root, 'brand', DARK_GROUND_DIR, id), { recursive: true, force: true });
  const files = { ladder: (size) => `${DARK_GROUND_DIR}/${id}/mark/mark-${size}.png`, ico: null };
  return [
    write(`${DARK_GROUND_DIR}/${id}.svg`, artFile(art.mark, loaded.family[id].name)),
    ...await ladder(write, art.artAt, files, loaded.sizes),
  ];
};

export { buildDarkGround };
