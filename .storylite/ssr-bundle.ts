/* @layer root-config @kind config */
import type { Plugin } from 'vite';
import { CJS_DEFAULT_INTEROP, SSR_BUNDLED } from './ssr-bundle.constants';

const unwrapDefaults = (code: string): string =>
  CJS_DEFAULT_INTEROP.reduce((out, pkg) => out.replace(
    new RegExp(`import (\\w+) from '${pkg}';`, 'g'),
    (_all, name: string) => `import * as ${name}$ns from '${pkg}';\nconst ${name} = ${name}$ns.default?.default ?? ${name}$ns.default;`,
  ), code);

const ssrBundle = (): Plugin => ({
  name: 'tessera:ssr-bundle',
  config: () => ({ ssr: { noExternal: SSR_BUNDLED } }),
  transform(code, id) {
    if (this.environment.config.consumer !== 'server' || !SSR_BUNDLED.some((pkg) => id.includes(`/${pkg}/`))) return null;
    const out = unwrapDefaults(code);
    return out === code ? null : { code: out, map: null };
  },
});

export { ssrBundle };
