/* @layer tooling-scripts @kind data */
const GUIDE_DIR = 'guide';
const COMPONENTS_DIR = 'guide/components';
const SRC_DIR = 'src';
const SKIPPED_FOLDERS = ['guide', 'sub-components', 'behavior'];
const TIER_ORDER = ['primitives', 'composites', 'brand'];
const APP_TIER_ORDER = ['primitives', 'composites', 'compounds', 'views'];
const USAGE_SUFFIX = '.usage.ts';
const TREE_MODULE = '/src/guide/tree.constants.ts';
const APP_TREE_EXPORT = 'APP_TREE';
const STORIES_DIR = 'stories';
const THEME_DIR = 'src/theme';
const EXAMPLE_DIR = '.guide-examples';
const MODE_KEY = 'guide.usage';
const DEFAULT_MODE = 'report';
const REQUIRED_TEXT = ['job', 'example', 'propsHash'];
const REQUIRED_LISTS = ['useWhen', 'avoidWhen', 'rules', 'a11y'];
const LITERAL_LIMIT = 12;

const TESSERA_WORDS = {
  tree: 'src/guide/tree.constants.ts',
  unknown: 'which the package does not export',
};

const FILES = {
  readme: 'guide/README.md',
  rules: 'guide/rules.md',
  decide: 'guide/decide.md',
  index: 'guide/index.md',
  registry: 'guide/registry.json',
};

export {
  APP_TIER_ORDER, APP_TREE_EXPORT, COMPONENTS_DIR, DEFAULT_MODE, EXAMPLE_DIR, FILES, GUIDE_DIR, LITERAL_LIMIT, MODE_KEY, REQUIRED_LISTS,
  REQUIRED_TEXT, SKIPPED_FOLDERS, SRC_DIR, STORIES_DIR, TESSERA_WORDS, THEME_DIR, TIER_ORDER, TREE_MODULE, USAGE_SUFFIX,
};
