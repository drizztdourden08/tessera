/* @layer renderer-components @kind util */
import type { ImagePixelated, ImageSize } from '../Image.type';
import { isPixelArt } from './is-pixel-art';

const pixelatedOf = (pixelated: ImagePixelated, natural: ImageSize | null | undefined): boolean =>
  (pixelated === 'auto' ? isPixelArt(natural) : pixelated);

export { pixelatedOf };
