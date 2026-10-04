/* @layer root-config @kind config */
import type { Plugin } from 'vite';
import { HOME_LOGO_BUILD_FILE, HOME_LOGO_SOURCE } from './config.constants';

const homeLogoPlugin = (root: string): Plugin => ({
  name: 'tessera:home-logo',
  apply: 'build',
  buildStart() {
    this.emitFile({ type: 'chunk', id: `${root.replace(/\\/g, '/')}${HOME_LOGO_SOURCE}`, fileName: HOME_LOGO_BUILD_FILE });
  },
});

export { homeLogoPlugin };
