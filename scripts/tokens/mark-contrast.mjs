/* @layer tooling-scripts @kind logic */
import { Resvg } from '@resvg/resvg-js';
import { luminanceRatio } from './luminance-ratio.mjs';
import { parseColour } from './parse-colour.mjs';
import { relativeLuminance } from './relative-luminance.mjs';

const SAMPLE_WIDTH = 256;

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
  return stops.map((stop) => luminanceRatio(mark, relativeLuminance(parseColour(stop).rgb)));
};

export { markContrast };
