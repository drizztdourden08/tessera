/* @layer stories @kind logic */
type Rgba = readonly [r: number, g: number, b: number, a: number];

let context: CanvasRenderingContext2D | null = null;

const paintContext = (): CanvasRenderingContext2D | null => {
  if (!context) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    context = canvas.getContext('2d', { willReadFrequently: true });
  }
  return context;
};

const readPixel = (ctx: CanvasRenderingContext2D): Rgba => {
  const [r = 0, g = 0, b = 0, a = 0] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b, a];
};

const composite = (layers: readonly string[]): Rgba | null => {
  const ctx = paintContext();
  if (!ctx) return null;
  ctx.clearRect(0, 0, 1, 1);
  for (const layer of layers) {
    ctx.fillStyle = layer;
    ctx.fillRect(0, 0, 1, 1);
  }
  return readPixel(ctx);
};

const toLinear = (channel: number): number => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = ([r, g, b]: Rgba): number =>
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

const contrastRatio = (a: Rgba, b: Rgba): number => {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const hexOf = ([r, g, b]: Rgba): string =>
  `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;

export { composite, contrastRatio, hexOf };
