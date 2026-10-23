/* @layer renderer-components @kind data */
const SWATCH_SELECTOR = '[data-swatch-index]';

const CHORD_KEYS = 'Alt+ArrowUp Alt+ArrowDown Alt+ArrowLeft Alt+ArrowRight';

const FOCUS_KEYS: Readonly<Record<string, 'first' | 'last'>> = { Home: 'first', End: 'last' };

export { CHORD_KEYS, FOCUS_KEYS, SWATCH_SELECTOR };
