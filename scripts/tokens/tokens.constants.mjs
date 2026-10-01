/* @layer tooling-scripts @kind data */
const TOKENS_INDEX = 'src/tokens/index.css';
const BRAND_CSS = 'src/tokens/brand.css';
const PALETTES_DIR = 'stories/themes';
const DEFAULT_PALETTE = 'tessera';
const TOKENS_JSON = 'tokens.json';
const SPLASH_CSS = 'splash-tokens.css';
const STYLE_HEADER = '/* @layer renderer-design-system @kind style */';

const THEME_COLOURS = {
  bg: '--c-bg',
  surface: '--c-surface',
  hairline: '--c-hairline',
  border: '--c-border',
  text: '--c-text',
  textDim: '--c-text-dim',
  textMuted: '--c-text-muted',
  textFaint: '--c-text-faint',
  primary: '--c-primary',
  onPrimary: '--c-on-primary',
};

const THEME_SCALES = { radius: '--radius-', space: '--space-' };

export { BRAND_CSS, DEFAULT_PALETTE, PALETTES_DIR, SPLASH_CSS, STYLE_HEADER, THEME_COLOURS, THEME_SCALES, TOKENS_INDEX, TOKENS_JSON };
