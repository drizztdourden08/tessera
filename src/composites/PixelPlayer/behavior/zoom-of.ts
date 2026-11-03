/* @layer renderer-components @kind util */
import type { ZoomParams } from '../PixelPlayer.type';
import { fitZoom } from './fit-zoom';

const largest = (frames: ZoomParams['frames']) =>
  frames.reduce((box, frame) => ({ width: Math.max(box.width, frame.image.width), height: Math.max(box.height, frame.image.height) }), { width: 0, height: 0 });

const zoomOf = (params: ZoomParams): number => {
  const { zoom, stage, frames } = params;
  return zoom === 'fit' ? fitZoom(stage, largest(frames)) : Math.max(1, Math.floor(zoom));
};

export { zoomOf };
