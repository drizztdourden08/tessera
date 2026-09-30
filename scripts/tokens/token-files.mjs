/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { brandCss } from './brand-css.mjs';
import { brandGradientLines } from './brand-gradient-lines.mjs';
import { readTokenSources } from './read-token-sources.mjs';
import { resolveTokens } from './resolve-tokens.mjs';
import { splashCss } from './splash-css.mjs';
import { tokensJson } from './tokens-json.mjs';
import { BRAND_CSS, SPLASH_CSS, TOKENS_JSON } from './tokens.constants.mjs';

const isGradient = ([name]) => /^--brand-[\w-]+-gradient$/.test(name);
const STRING_LIST = /\[\n\s+("[^"\n]*"(?:,\n\s+"[^"\n]*")*)\n\s+\]/g;

const jsonText = (value) => `${JSON.stringify(value, null, 2).replace(STRING_LIST, (_, items) => `[${items.replace(/,\n\s+/g, ', ')}]`)}\n`;

const tokenFiles = (root, brands) => {
  const gradients = brandGradientLines(brands);
  const { base, palettes } = readTokenSources(root);
  const declarations = [...base.filter((entry) => !isGradient(entry)), ...gradients];
  const resolved = Object.fromEntries(Object.entries(palettes).map(([palette, seeds]) => [palette, resolveTokens([...declarations, ...seeds])]));
  return {
    [BRAND_CSS]: brandCss(readFileSync(join(root, BRAND_CSS), 'utf8'), gradients),
    [TOKENS_JSON]: jsonText(tokensJson(resolved, brands)),
    [SPLASH_CSS]: splashCss(resolved),
  };
};

export { tokenFiles };
