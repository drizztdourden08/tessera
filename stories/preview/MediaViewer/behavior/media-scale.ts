/* @layer stories @kind logic */
import { PIXEL_ART_MAX_SIDE } from '../MediaViewer.constants';
import type { MediaViewerItem, MediaViewerPixels, NaturalSize, ZoomState } from '../MediaViewer.type';

const scaleOf = (item: MediaViewerItem, zoom: ZoomState, natural: NaturalSize | null): number | null =>
  (item.kind === 'image' && natural !== null && typeof zoom.zoom === 'number' ? zoom.zoom : null);

const crispOf = (pixelated: MediaViewerPixels, natural: NaturalSize | null): boolean => {
  if (pixelated !== 'auto') return pixelated;
  return natural !== null && Math.max(natural.width, natural.height) <= PIXEL_ART_MAX_SIDE;
};

export { crispOf, scaleOf };
