/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ICON_DIR } from './new.constants.mjs';

const checkIcon = (root, icon) =>
  (existsSync(join(root, ICON_DIR, `${icon}.js`)) ? undefined : `--icon: Lucide has no icon "${icon}". Pick a name from https://lucide.dev/icons`);

export { checkIcon };
