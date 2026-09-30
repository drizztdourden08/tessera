/* @layer tooling-scripts @kind logic */
import { Resvg } from '@resvg/resvg-js';
import { parseColour } from './parse-colour.mjs';

const SAMPLE_WIDTH = 256;
const WEIGHTS = [0.2126, 0.7152, 0.0722];

const linear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const relativeLuminance = (rgb) => rgb.reduce((sum, c, i) => sum + WEIGHTS[i] * linear(c), 0);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const markLuminance = (svg) => {
  const { pixels } = new Resvg(svg, { fitTo: { mode: 'width', value: SAMPLE_WIDTH } }).render();
  let total = 0;
  let cover = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3] / 255;
    total += alpha * relativeLuminance([pixels[i], pixels[i + 1], pixels[i + 2]].map((c) => c / 255));
    cover += alpha;
  }
  return total / cover;
};

const markContrast = (svg, stops) => {
  const mark = markLuminance(svg);
  return stops.map((stop) => ratio(mark, relativeLuminance(parseColour(stop).rgb)));
};

export { markContrast };
