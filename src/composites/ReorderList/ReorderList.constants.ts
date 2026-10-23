/* @layer renderer-components @kind data */
const ITEM_SELECTOR = ':scope > [data-reorder-index]';

const TOGGLES_SELECTOR = '[data-reorder-toggles]';

const CHORD_KEYS = 'Alt+ArrowUp Alt+ArrowDown';

const FOCUS_KEYS: Readonly<Record<string, 'first' | 'last'>> = { Home: 'first', End: 'last' };

export { CHORD_KEYS, FOCUS_KEYS, ITEM_SELECTOR, TOGGLES_SELECTOR };
