/* @layer renderer-components @kind data */
const CHORD_KEYS = 'Alt+ArrowUp Alt+ArrowDown';

const FOCUS_KEYS: Readonly<Record<string, 'first' | 'last'>> = { Home: 'first', End: 'last' };

export { CHORD_KEYS, FOCUS_KEYS };
