/* @layer stories @kind logic */
import { ZOOM_STEPS } from '../MediaViewer.constants';
import type { MediaViewerZoom } from '../MediaViewer.type';

const zoomLevels = (fitScale: number | null): MediaViewerZoom[] => {
  if (fitScale === null) return ['fit'];
  const below = ZOOM_STEPS.filter((step) => step < fitScale);
  const above = ZOOM_STEPS.filter((step) => step > fitScale);
  return [...below, 'fit', ...above];
};

export { zoomLevels };
