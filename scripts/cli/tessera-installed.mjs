/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { listsPackage } from './lists-package.mjs';
import { PACKAGE_NAME } from './new.constants.mjs';
import { readManifest } from './read-manifest.mjs';

const tesseraInstalled = (dir) =>
  dir !== undefined && (listsPackage(readManifest(dir), PACKAGE_NAME) || existsSync(join(dir, 'node_modules', PACKAGE_NAME, 'package.json')));

export { tesseraInstalled };
