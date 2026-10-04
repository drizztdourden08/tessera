/* @layer tooling-scripts @kind data */
const FAINT_TEXT = /var\(\s*--c-text-faint\s*[,)]/;
const TEXT_COLOUR_PROPS = new Set(['color', '-webkit-text-fill-color', 'caret-color']);

export { FAINT_TEXT, TEXT_COLOUR_PROPS };
