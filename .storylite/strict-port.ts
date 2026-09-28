/* @layer root-config @kind config */
import type { Plugin } from 'vite';

const strictPort = (): Plugin => ({
  name: 'tessera:strict-port',
  config: () => ({ server: { strictPort: true } }),
});

export { strictPort };
