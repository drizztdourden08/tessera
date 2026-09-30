/* @layer renderer-components @kind data */
const NO_OPTIONS = 'No options';

const NO_MATCHES = 'No matches';

const DEFAULT_PLACEHOLDER = 'Select...';

const OPEN_KEYS: ReadonlySet<string> = new Set(['ArrowDown', 'ArrowUp', 'Enter', ' ']);

const CLEAR_KEYS: ReadonlySet<string> = new Set(['Backspace', 'Delete']);

export { CLEAR_KEYS, DEFAULT_PLACEHOLDER, NO_MATCHES, NO_OPTIONS, OPEN_KEYS };
