/* @layer tooling-scripts @kind data */
const DISABLED_TEXT = /var\(\s*--c-text-disabled\s*[,)]/;
const TEXT_COLOUR_PROPS = new Set(['color', '-webkit-text-fill-color', 'caret-color', '--tone-ink']);
const DISABLED_SELECTOR = /disabled/;
const COMMENT = /\/\*[\s\S]*?\*\//g;
const SELECTOR_PRELUDE = /([^{};@]+)\{/g;
const CLASS_NAME = /\.(-?[_a-zA-Z][\w-]*)/g;

export { CLASS_NAME, COMMENT, DISABLED_SELECTOR, DISABLED_TEXT, SELECTOR_PRELUDE, TEXT_COLOUR_PROPS };
