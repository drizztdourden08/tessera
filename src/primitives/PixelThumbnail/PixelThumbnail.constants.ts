/* @layer renderer-components @kind constants */
import type { PixelThumbnailBox } from './PixelThumbnail.type';

const DEFAULT_BOX: Exclude<PixelThumbnailBox, 'fluid'> = 24;

const MIN_FRAME_MS = 16;

export { DEFAULT_BOX, MIN_FRAME_MS };
