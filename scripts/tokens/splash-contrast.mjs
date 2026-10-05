/* @layer tooling-scripts @kind logic */
import { colourOver } from './colour-over.mjs';
import { luminanceRatio } from './luminance-ratio.mjs';
import { relativeLuminance } from './relative-luminance.mjs';
import { ruleDeclarations } from './rule-declarations.mjs';
import { SPLASH_PARTS } from './splash-contrast.constants.mjs';
import { splashGradientPoints } from './splash-gradient-points.mjs';
import { tokenColour } from './token-colour.mjs';

const COLOUR_VAR = /var\((--(?:c|ts)-[\w-]+)\)/g;

const lastColourVar = (value) => [...(value ?? '').matchAll(COLOUR_VAR)].at(-1)?.[1];

const tokenOf = (css, selectors, property) => {
  const declarations = ruleDeclarations(css, selectors);
  let name = lastColourVar(declarations.get(property));
  while (name?.startsWith('--ts-')) name = lastColourVar(declarations.get(name));
  if (!name) throw new Error(`${selectors.at(-1)} has no colour token on ${property}`);
  return name;
};

const splashContrast = (css, tokens) => {
  const points = splashGradientPoints(tokens);
  return SPLASH_PARTS.map(({ part, selectors, property, on, need }) => {
    const ink = tokenColour(tokens, tokenOf(css, selectors, property));
    const grounds = on ? points.map((point) => colourOver(tokenColour(tokens, tokenOf(css, on.selectors, on.property)), point)) : points;
    const front = (ground) => relativeLuminance(colourOver(ink, ground));
    const ratio = Math.min(...grounds.map((ground) => luminanceRatio(front(ground), relativeLuminance(ground))));
    return { part, ratio, need };
  });
};

export { splashContrast };
