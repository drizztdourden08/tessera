/* @layer renderer-components @kind util */
import type { PixelSize } from '../../pixel-image/pixel-image.type';
import type { FitSizeParams } from '../PixelThumbnail.type';

const stepScale = (ratio: number): number => (ratio >= 1 ? Math.floor(ratio) : ratio);

const fitSize = (params: FitSizeParams): PixelSize => {
  const { source, box, fit } = params;
  if (source.width <= 0 || source.height <= 0) return { width: box, height: box };
  const ratio = Math.min(box / source.width, box / source.height);
  const scale = fit === 'step' ? stepScale(ratio) : ratio;
  return { width: Math.max(1, Math.round(source.width * scale)), height: Math.max(1, Math.round(source.height * scale)) };
};

export { fitSize };
