/* @layer renderer-components @kind data */
const MAX_MASK_CELLS = 3;

const CELL_SLACK = 0.05;

const PROBE_LENGTH = 8;

const PROBE_NARROW = 'a';

const SYNC_EVENTS: readonly string[] = ['scroll', 'input', 'keyup', 'select', 'pointerup', 'focus'];

const PROBE_PAIR = '\u{1D400}';

export { CELL_SLACK, MAX_MASK_CELLS, PROBE_LENGTH, PROBE_NARROW, PROBE_PAIR, SYNC_EVENTS };
