/* @layer renderer-components @kind util */
import type { ImageSize } from '../Image.type';

const integerScale = (frame: ImageSize, natural: ImageSize): number => {
  if (frame.width <= 0 || frame.height <= 0 || natural.width <= 0 || natural.height <= 0) return 1;
  const ratio = Math.min(frame.width / natural.width, frame.height / natural.height);
  return ratio >= 1 ? Math.floor(ratio) : 1 / Math.ceil(1 / ratio);
};

export { integerScale };
