/* @layer renderer-components @kind util */
import type { ThumbnailNaming } from './thumbnail-naming.type';

const thumbnailNaming = (label: string | undefined): ThumbnailNaming =>
  (label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true });

export { thumbnailNaming };
