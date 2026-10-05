/* @layer tooling-scripts @kind logic */
import { luminanceRatio } from './luminance-ratio.mjs';
import { parseColour } from './parse-colour.mjs';
import { relativeLuminance } from './relative-luminance.mjs';
import { ruleDeclarations } from './rule-declarations.mjs';
import { GRADIENT_SAMPLES, SPLASH_GRADIENT, SPLASH_PARTS } from './splash-contrast.constants.mjs';

const COLOUR_VAR = /var\((--(?:c|ts)-[\w-]+)\)/g;

const lastColourVar = (value) => [...(value ?? '').matchAll(COLOUR_VAR)].at(-1)?.[1];

const tokenOf = (css, selectors, property) => {
  const declarations = ruleDeclarations(css, selectors);
  let name = lastColourVar(declarations.get(property));
  while (name?.startsWith('--ts-')) name = lastColourVar(declarations.get(name));
  if (!name) throw new Error(`${selectors.at(-1)} has no colour token on ${property}`);
  return name;
};

const colourOf = (tokens, name) => {
  const value = tokens.get(name);
  if (value === undefined) throw new Error(`the splash reads ${name}, which the tokens do not set`);
  return parseColour(value);
};

const over = ({ rgb, alpha }, ground) => rgb.map((c, i) => c * alpha + ground[i] * (1 - alpha));

const gradientPoints = (tokens) => {
  const [from, to] = [SPLASH_GRADIENT.from, SPLASH_GRADIENT.to].map((name) => colourOf(tokens, name).rgb);
  return Array.from({ length: GRADIENT_SAMPLES + 1 }, (_, step) => from.map((c, i) => c + (to[i] - c) * (step / GRADIENT_SAMPLES)));
};

const splashContrast = (css, tokens) => {
  const points = gradientPoints(tokens);
  return SPLASH_PARTS.map(({ part, selectors, property, on, need }) => {
    const ink = colourOf(tokens, tokenOf(css, selectors, property));
    const grounds = on ? points.map((point) => over(colourOf(tokens, tokenOf(css, on.selectors, on.property)), point)) : points;
    const front = (ground) => relativeLuminance(over(ink, ground));
    const ratio = Math.min(...grounds.map((ground) => luminanceRatio(front(ground), relativeLuminance(ground))));
    return { part, ratio, need };
  });
};

export { splashContrast };
