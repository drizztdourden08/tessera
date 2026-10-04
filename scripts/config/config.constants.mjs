/* @layer tooling-scripts @kind data */
const CONFIG_FILE = 'tessera.config.json';
const SCHEMA_FILE = new URL('../../tessera.config.schema.json', import.meta.url);
const PART_KINDS = ['primitives', 'composites', 'compounds', 'views'];
const SEARCH_STOPS = ['.git', 'pnpm-workspace.yaml'];
const GLOB_CHARS = /[*?[\]{}]/;

const DEFAULTS = {
  layer: 'renderer-app',
  stories: 'stories',
  themeCss: 'src/theme.css',
  guideUsage: 'report',
  guideOut: 'guide',
};

const TYPE_NAMES = {
  string: 'a string',
  object: 'an object',
  array: 'a list',
  integer: 'a whole number',
  number: 'a number',
  boolean: 'true or false',
  null: 'null',
};

export { CONFIG_FILE, DEFAULTS, GLOB_CHARS, PART_KINDS, SCHEMA_FILE, SEARCH_STOPS, TYPE_NAMES };
