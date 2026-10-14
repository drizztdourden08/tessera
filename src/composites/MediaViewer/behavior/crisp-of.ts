/* @layer renderer-components @kind logic */
import { PIXEL_ART_MAX_SIDE } from '../MediaViewer.constants';
import type { MediaViewerPixels, NaturalSize } from '../MediaViewer.type';

const crispOf = (pixelated: MediaViewerPixels, natural: NaturalSize | null): boolean => {
  if (pixelated !== 'auto') return pixelated;
  return natural !== null && Math.max(natural.width, natural.height) <= PIXEL_ART_MAX_SIDE;
};

export { crispOf };
