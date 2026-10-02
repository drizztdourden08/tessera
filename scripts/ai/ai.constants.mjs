/* @layer tooling-scripts @kind data */
const AI_DIR = 'ai';
const COMPONENTS_DIR = 'ai/components';
const SRC_DIR = 'src';
const SKIPPED_FOLDERS = ['ai', 'sub-components', 'behavior'];
const TIER_ORDER = ['primitives', 'composites', 'brand'];
const USAGE_SUFFIX = '.usage.ts';
const TREE_MODULE = '/src/ai/tree.constants.ts';
const STORIES_DIR = 'stories';
const THEME_DIR = 'src/theme';
const EXAMPLE_DIR = '.ai-examples';
const MODE_KEY = 'aiUsage';
const MODES = ['report', 'enforce'];
const DEFAULT_MODE = 'report';
const REQUIRED_TEXT = ['job', 'example', 'propsHash'];
const REQUIRED_LISTS = ['useWhen', 'avoidWhen', 'rules', 'a11y'];
const LITERAL_LIMIT = 12;

const FILES = {
  readme: 'ai/README.md',
  rules: 'ai/rules.md',
  decide: 'ai/decide.md',
  index: 'ai/index.md',
  registry: 'ai/registry.json',
};

export {
  AI_DIR, COMPONENTS_DIR, DEFAULT_MODE, EXAMPLE_DIR, FILES, LITERAL_LIMIT, MODE_KEY, MODES, REQUIRED_LISTS,
  REQUIRED_TEXT, SKIPPED_FOLDERS, SRC_DIR, STORIES_DIR, THEME_DIR, TIER_ORDER, TREE_MODULE, USAGE_SUFFIX,
};
