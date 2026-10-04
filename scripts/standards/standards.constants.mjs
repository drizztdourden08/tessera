/* @layer tooling-scripts @kind data */
const EXTENSION_ID = 'tessera';
const EXTENSION_DESCRIPTION = 'The parts of tessera.config.json: a usage file in every part, raw HTML in the app primitives and composites, and the theme as a token file';
const USAGE_REASON = 'every part in the folders of tessera.config.json says when to use it';
const ESLINT_RULES = { 'tessera/no-icon-button-child': 'error', 'tessera/prefer-named-input': 'error' };
const WALK_SKIP = new Set(['node_modules', 'sub-components', 'behavior']);

export { ESLINT_RULES, EXTENSION_DESCRIPTION, EXTENSION_ID, USAGE_REASON, WALK_SKIP };
