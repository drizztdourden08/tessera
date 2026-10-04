/* @layer root-config @kind logic */
import { posix } from 'node:path';
import { RELATIVE_URL } from './frame-css-urls.constants';

const frameCssUrls = (css: string, sheetDir: string): string =>
  css.replace(RELATIVE_URL, (_all, quote: string, path: string) => `url(${quote}./${posix.join(sheetDir, path.trim())}${quote})`);

export { frameCssUrls };
