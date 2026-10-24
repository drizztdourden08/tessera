/* @layer renderer-components @kind data */
const CHORD_KEYS = 'Alt+ArrowUp Alt+ArrowDown';

const FOCUS_KEYS: Readonly<Record<string, 'first' | 'last'>> = { Home: 'first', End: 'last' };

const LABEL_SELECTOR = '.list-item-row__primary';

const ROW_ACTION_KEYS: Readonly<Record<string, 'rename' | 'activate'>> = { F2: 'rename', Enter: 'activate' };

export { CHORD_KEYS, FOCUS_KEYS, LABEL_SELECTOR, ROW_ACTION_KEYS };
