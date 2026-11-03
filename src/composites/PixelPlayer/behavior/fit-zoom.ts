/* @layer renderer-components @kind util */
import type { PixelSize } from '../../../primitives/pixel-image/pixel-image.type';

const fitZoom = (stage: PixelSize, image: PixelSize): number => {
  if (image.width <= 0 || image.height <= 0) return 1;
  return Math.max(1, Math.floor(Math.min(stage.width / image.width, stage.height / image.height)));
};

export { fitZoom };
