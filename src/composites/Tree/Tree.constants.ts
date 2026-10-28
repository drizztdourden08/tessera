/* @layer renderer-components @kind constants */
const INDEX_ATTRIBUTE = 'data-tree-index';

const KEY_ATTRIBUTE = 'data-tree-key';

const COUNT_PROPERTY = '--tree-count';

const INDEX_PROPERTY = '--tree-index';

const INDENT_PROPERTY = '--tree-row-indent';

const SPRING_DELAY = 600;

const DRAG_THRESHOLD = 4;

const INTO_BAND = 0.25;

const GHOST_LIMIT = 3;

const INTERACTIVE = 'button, input, textarea, select, a, [contenteditable="true"]';

const NO_KEYS: readonly string[] = [];

const NO_SET: ReadonlySet<string> = new Set();

export { COUNT_PROPERTY, DRAG_THRESHOLD, GHOST_LIMIT, INDENT_PROPERTY, INDEX_ATTRIBUTE, INDEX_PROPERTY, INTERACTIVE, INTO_BAND, KEY_ATTRIBUTE, NO_KEYS, NO_SET, SPRING_DELAY };
