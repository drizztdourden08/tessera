/* @layer renderer-components @kind util */
import type { ImageSize } from '../Image.type';
import { PIXEL_ART_MAX_SIDE } from './pixel-art.constants';

const isPixelArt = (size: ImageSize | null | undefined): boolean =>
  size != null && size.width > 0 && size.height > 0 && Math.max(size.width, size.height) <= PIXEL_ART_MAX_SIDE;

export { isPixelArt };
