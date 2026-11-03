/* @layer renderer-components @kind util */
import type { PixelThumbnailBackdrop } from '../PixelThumbnail.type';

const thumbnailClass = (backdrop: PixelThumbnailBackdrop, className: string | undefined): string =>
  ['pixel-thumbnail', backdrop === 'checker' && 'pixel-thumbnail--checker', className].filter(Boolean).join(' ');

export { thumbnailClass };
