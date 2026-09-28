/* @layer root-config @kind config */
import type { Plugin } from 'vite';
import { WINDOWS_FS_ID } from './windows-fs-paths.constants';

const windowsFsPaths = (): Plugin => ({
  name: 'tessera:windows-fs-paths',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    const match = WINDOWS_FS_ID.exec(source);
    const drivePath = match?.[1];
    if (drivePath === undefined) return null;
    const path = drivePath.replace(/\\/g, '/');
    const resolved = await this.resolve(path, importer, { ...options, skipSelf: true });
    return resolved ?? path;
  },
});

export { windowsFsPaths };
