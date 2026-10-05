/* @layer tooling-scripts @kind logic */
import { colourOver } from './colour-over.mjs';
import { luminanceRatio } from './luminance-ratio.mjs';
import { parseColour } from './parse-colour.mjs';
import { relativeLuminance } from './relative-luminance.mjs';
import { splashGradientPoints } from './splash-gradient-points.mjs';

const splashMarkContrast = (paths, tokens, gradient) => {
  const points = splashGradientPoints(tokens, gradient);
  return paths.map(({ ink, opacity = 1 }) => {
    const { rgb, alpha } = parseColour(ink);
    const shape = { rgb, alpha: alpha * opacity };
    const ratio = Math.min(...points.map((point) => luminanceRatio(relativeLuminance(colourOver(shape, point)), relativeLuminance(point))));
    return { ink, ratio };
  });
};

export { splashMarkContrast };
