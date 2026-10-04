/* @layer tooling-scripts @kind data */
const FAINT_TEXT = /var\(\s*--c-text-faint\s*[,)]/;
const TEXT_COLOUR_PROPS = new Set(['color', '-webkit-text-fill-color', 'caret-color']);
const COMMENT = /\/\*[\s\S]*?\*\//g;
const SELECTOR_PRELUDE = /([^{};@]+)\{/g;
const CLASS_NAME = /\.(-?[_a-zA-Z][\w-]*)/g;

export { CLASS_NAME, COMMENT, FAINT_TEXT, SELECTOR_PRELUDE, TEXT_COLOUR_PROPS };
