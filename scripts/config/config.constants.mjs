/* @layer tooling-scripts @kind data */
const CONFIG_FILE = 'tessera.config.json';
const SCHEMA_FILE = new URL('../../tessera.config.schema.json', import.meta.url);
const PART_KINDS = ['primitives', 'composites', 'compounds', 'views'];
const GLOB_CHARS = /[*?[\]{}]/;

const DEFAULTS = {
  stories: 'stories',
  themeCss: 'src/theme.css',
  aiUsage: 'report',
  aiOut: 'ai',
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

export { CONFIG_FILE, DEFAULTS, GLOB_CHARS, PART_KINDS, SCHEMA_FILE, TYPE_NAMES };
