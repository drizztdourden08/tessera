/* @layer renderer-components @kind util */
import { IMAGE_PROTOCOLS } from '../Markdown.constants';
import type { MarkdownImages } from '../Markdown.type';
import { isAppPath } from './app-path';
import { dataImage } from './data-image';

const isWebImage = (url: string): boolean => URL.canParse(url) && IMAGE_PROTOCOLS.has(new URL(url).protocol);

const allowedImage = (url: string): string | undefined => (isWebImage(url) || isAppPath(url) ? url : dataImage(url));

const imageSource = (src: string | undefined, images: MarkdownImages | undefined): string | undefined => {
  if (!src || !images) return undefined;
  if (images === true) return isWebImage(src) ? src : dataImage(src);
  const resolved = images(src);
  return resolved ? allowedImage(resolved) : undefined;
};

export { imageSource };
