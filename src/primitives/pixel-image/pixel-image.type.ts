/* @layer renderer-components @kind types */
interface RgbaImage {
  width: number;
  height: number;
  rgba: Uint8ClampedArray;
}

interface IndexedImage {
  width: number;
  height: number;
  pixels: ArrayLike<number>;
  palette: readonly string[];
  transparent?: number;
}

interface PixelSize {
  width: number;
  height: number;
}

export type { IndexedImage, PixelSize, RgbaImage };
