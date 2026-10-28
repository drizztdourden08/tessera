/* @layer renderer-components @kind constants */
const SCRUB_PIXELS = 6;

const FINE_DIVISOR = 10;

const KEY_DIRECTIONS: Readonly<Record<string, 1 | -1>> = { ArrowUp: 1, ArrowDown: -1 };

export { FINE_DIVISOR, KEY_DIRECTIONS, SCRUB_PIXELS };
