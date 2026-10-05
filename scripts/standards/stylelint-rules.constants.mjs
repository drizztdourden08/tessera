/* @layer tooling-scripts @kind data */
const FAINT_TEXT = /var\(\s*--c-text-faint\s*[,)]/;
const TEXT_COLOUR_PROPS = new Set(['color', '-webkit-text-fill-color', 'caret-color', '--tone-ink']);
const FAINT_TONE_SELECTOR = '.text-el--tone-faint';
const COMMENT = /\/\*[\s\S]*?\*\//g;
const SELECTOR_PRELUDE = /([^{};@]+)\{/g;
const CLASS_NAME = /\.(-?[_a-zA-Z][\w-]*)/g;

export { CLASS_NAME, COMMENT, FAINT_TEXT, FAINT_TONE_SELECTOR, SELECTOR_PRELUDE, TEXT_COLOUR_PROPS };
