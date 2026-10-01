/* @layer root-config @kind config */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { FAVICON_FILE } from './config.constants';

const faviconPlugin = (root: string): Plugin => ({
  name: 'tessera:favicon',
  apply: 'build',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: FAVICON_FILE, source: readFileSync(join(root, FAVICON_FILE)) });
  },
});

export { faviconPlugin };
