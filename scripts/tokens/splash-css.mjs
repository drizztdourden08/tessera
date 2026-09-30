/* @layer tooling-scripts @kind logic */
import { DEFAULT_PALETTE, STYLE_HEADER } from './tokens.constants.mjs';

const rule = (selector, entries) => `${selector} {\n${entries.map(([name, value]) => `  ${name}: ${value};\n`).join('')}}\n`;

const splashCss = (resolved) => {
  const base = resolved[DEFAULT_PALETTE];
  const blocks = [rule(':root', [...base])];
  for (const [palette, tokens] of Object.entries(resolved)) {
    const changed = [...tokens].filter(([name, value]) => base.get(name) !== value);
    if (palette !== DEFAULT_PALETTE && changed.length) blocks.push(rule(`[data-palette="${palette}"]`, changed));
  }
  return `${STYLE_HEADER}\n${blocks.join('\n')}`;
};

export { splashCss };
