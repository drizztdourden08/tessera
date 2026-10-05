/* @layer tooling-scripts @kind logic */
import { GRADIENT_SAMPLES, SPLASH_GRADIENT } from './splash-contrast.constants.mjs';
import { tokenColour } from './token-colour.mjs';

const splashGradientPoints = (tokens, gradient = SPLASH_GRADIENT) => {
  const [from, to] = [gradient.from, gradient.to].map((name) => tokenColour(tokens, name).rgb);
  return Array.from({ length: GRADIENT_SAMPLES + 1 }, (_, step) => from.map((c, i) => c + (to[i] - c) * (step / GRADIENT_SAMPLES)));
};

export { splashGradientPoints };
