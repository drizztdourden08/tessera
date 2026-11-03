/* @layer stories @kind logic */
import type { PixelThumbnailFrame } from '../../../src/primitives';
import { indexedRgba } from '../../../src/primitives/pixel-image/indexed-rgba';
import { HEART_BEAT_COLORS, HEART_FRAME_MS, HEART_INDEXED } from './pixel-samples.constants';

const heartFrames = (): readonly PixelThumbnailFrame[] =>
  HEART_BEAT_COLORS.map((color) => ({
    image: indexedRgba({ ...HEART_INDEXED, palette: ['#000000', color, '#f1faee'] }),
    durationMs: HEART_FRAME_MS,
  }));

export { heartFrames };
