/* @layer stories @kind data */
import type { IndexedImage, PixelThumbnailBox } from '../../../src/primitives';

const HEART_PIXELS: readonly number[] = [
  0, 1, 1, 0, 0, 1, 1, 0,
  1, 1, 2, 1, 1, 1, 1, 1,
  1, 2, 2, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const HEART_INDEXED: IndexedImage = {
  width: 8,
  height: 8,
  pixels: HEART_PIXELS,
  palette: ['#000000', '#e63946', '#f1faee'],
  transparent: 0,
};

const HEART_BEAT_COLORS: readonly string[] = ['#e63946', '#f77f00', '#fcbf49', '#80b918', '#4cc9f0', '#7209b7'];

const HEART_FRAME_MS = 160;

const DISC_SIZE = 40;

const THUMBNAIL_BOXES: Readonly<Record<string, PixelThumbnailBox>> = {
  '16': 16, '24': 24, '32': 32, '40': 40, '48': 48, '64': 64,
};

const THUMBNAIL_BOX_KEYS: readonly string[] = Object.keys(THUMBNAIL_BOXES);

export { DISC_SIZE, HEART_BEAT_COLORS, HEART_FRAME_MS, HEART_INDEXED, THUMBNAIL_BOX_KEYS, THUMBNAIL_BOXES };
