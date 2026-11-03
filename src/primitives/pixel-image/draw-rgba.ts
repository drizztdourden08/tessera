/* @layer renderer-components @kind util */
import type { PixelSize, RgbaImage } from './pixel-image.type';

const imageDataOf = (context: CanvasRenderingContext2D, source: RgbaImage): ImageData => {
  const data = context.createImageData(source.width, source.height);
  data.data.set(source.rgba.subarray(0, data.data.length));
  return data;
};

const scratchOf = (canvas: HTMLCanvasElement, data: ImageData): HTMLCanvasElement => {
  const scratch = canvas.ownerDocument.createElement('canvas');
  scratch.width = data.width;
  scratch.height = data.height;
  scratch.getContext('2d')?.putImageData(data, 0, 0);
  return scratch;
};

const drawRgba = (canvas: HTMLCanvasElement | null, source: RgbaImage | null, size: PixelSize): void => {
  const context = canvas?.getContext('2d');
  if (!canvas || !context) return;
  canvas.width = size.width;
  canvas.height = size.height;
  if (!source || source.width <= 0 || source.height <= 0) return;
  const data = imageDataOf(context, source);
  if (size.width === source.width && size.height === source.height) {
    context.putImageData(data, 0, 0);
    return;
  }
  context.imageSmoothingEnabled = false;
  context.drawImage(scratchOf(canvas, data), 0, 0, size.width, size.height);
};

export { drawRgba };
