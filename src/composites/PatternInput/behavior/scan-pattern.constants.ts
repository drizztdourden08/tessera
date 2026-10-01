/* @layer renderer-components @kind data */
const ESCAPE = '\\';

const QUOTE = '"';

const GROUP_CLOSERS: ReadonlyMap<string, string> = new Map([['{', '}'], ['[', ']']]);

const STRAY_CLOSERS: ReadonlySet<string> = new Set(['}', ']']);

const PATTERN_SPECIALS = /[\\{}[\]]/g;

export { ESCAPE, GROUP_CLOSERS, PATTERN_SPECIALS, QUOTE, STRAY_CLOSERS };
