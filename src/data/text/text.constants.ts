/* @layer renderer-components @kind data */
const PLAIN_TEXT = /^[\u0020-\u007e]*$/u;

const ACCENT_MARK = /(?=\p{Diacritic})\p{M}/gu;

const SPACES = /\s+/u;

export { ACCENT_MARK, PLAIN_TEXT, SPACES };
