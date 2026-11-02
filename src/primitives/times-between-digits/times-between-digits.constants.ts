/* @layer renderer-components @kind data */
const TIMES = '×';

const BETWEEN_DIGITS = /(?<=\d)x(?=\d)/g;

const HEX_PREFIX = /(?<![\w.])0$/;

export { BETWEEN_DIGITS, HEX_PREFIX, TIMES };
