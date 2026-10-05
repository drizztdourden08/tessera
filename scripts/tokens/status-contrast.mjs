/* @layer tooling-scripts @kind logic */
import { colourOver } from './colour-over.mjs';
import { luminanceRatio } from './luminance-ratio.mjs';
import { parseColour } from './parse-colour.mjs';
import { relativeLuminance } from './relative-luminance.mjs';
import { NEED, PAGE_GROUNDS, STATUS_TONES, TEXT_STEPS, TONE_GROUNDS } from './status-contrast.constants.mjs';

const flatOver = (tokens, name, ground) => colourOver(parseColour(tokens.get(name)), ground);

const statusContrast = (tokens) => {
  const bg = flatOver(tokens, '--c-bg', [0, 0, 0]);
  const surface = flatOver(tokens, '--c-surface', bg);
  const ground = (name) => flatOver(tokens, name, name === '--c-bg' ? [0, 0, 0] : surface);
  const ratio = (ink, under) => luminanceRatio(relativeLuminance(ground(ink)), relativeLuminance(ground(under)));
  return STATUS_TONES.flatMap((tone) => {
    const fill = `--c-${tone}`;
    const grounds = [...PAGE_GROUNDS, ...TONE_GROUNDS.map((step) => `${fill}-${step}`)];
    const text = TEXT_STEPS.flatMap((step) => grounds.map((under) => ({ tone, use: 'text', ink: `${fill}${step}`, under, need: NEED.text })));
    const graphic = PAGE_GROUNDS.map((under) => ({ tone, use: 'icon or border', ink: fill, under, need: NEED.graphic }));
    const label = { tone, use: 'text on its fill', ink: `--c-on-${tone}`, under: fill, need: NEED.text };
    return [...text, ...graphic, label].map((pair) => ({ ...pair, ratio: ratio(pair.ink, pair.under) }));
  });
};

export { statusContrast };
