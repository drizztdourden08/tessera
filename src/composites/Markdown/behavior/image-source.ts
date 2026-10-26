/* @layer renderer-components @kind util */
import { IMAGE_PROTOCOLS } from '../Markdown.constants';
import type { MarkdownImages } from '../Markdown.type';
import { isAppPath } from './app-path';

const isWebImage = (url: string): boolean => URL.canParse(url) && IMAGE_PROTOCOLS.has(new URL(url).protocol);

const imageSource = (src: string | undefined, images: MarkdownImages | undefined): string | undefined => {
  if (!src || !images) return undefined;
  if (images === true) return isWebImage(src) ? src : undefined;
  const resolved = images(src);
  return resolved && (isWebImage(resolved) || isAppPath(resolved)) ? resolved : undefined;
};

export { imageSource };
