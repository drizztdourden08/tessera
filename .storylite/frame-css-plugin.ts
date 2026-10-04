/* @layer root-config @kind config */
import { posix } from 'node:path';
import type { Plugin } from 'vite';
import { frameCssUrls } from './frame-css-urls';
import {
  FRAME_CSS_END, FRAME_CSS_REGISTRY, FRAME_CSS_SLOT_LITERAL, FRAME_CSS_START, IMPORTED_CSS_EXPORT, PROJECT_MODULE_ID,
} from './frame-css.constants';

const sheetText = (source: string | Uint8Array): string => (typeof source === 'string' ? source : new TextDecoder().decode(source));

const frameCssPlugin = (): Plugin => ({
  name: 'tessera:frame-css',
  apply: 'build',
  enforce: 'post',
  config: () => ({ build: { cssCodeSplit: false } }),
  transform(code, id) {
    if (id !== PROJECT_MODULE_ID) return null;
    if (!code.includes(IMPORTED_CSS_EXPORT)) this.error(`Storylite's project module no longer exports "${IMPORTED_CSS_EXPORT}".`);
    return { code: code.replace(IMPORTED_CSS_EXPORT, FRAME_CSS_REGISTRY), map: null };
  },
  generateBundle(_options, bundle) {
    const sheets: string[] = [];
    let project = null;
    for (const [name, file] of Object.entries(bundle)) {
      if (file.type === 'chunk' && FRAME_CSS_SLOT_LITERAL.test(file.code)) project = file;
      if (file.type !== 'asset' || !name.endsWith('.css')) continue;
      sheets.push(frameCssUrls(sheetText(file.source), posix.dirname(name)));
      delete bundle[name];
    }
    if (!project) return this.error('No built chunk holds the preview frame css slot.');
    if (sheets.length === 0) return this.error('The build emitted no component css for the preview frame.');
    const css = JSON.stringify(`${FRAME_CSS_START}\n${sheets.join('\n')}\n${FRAME_CSS_END}`);
    project.code = project.code.replace(FRAME_CSS_SLOT_LITERAL, () => css);
    return undefined;
  },
});

export { frameCssPlugin };
