/* @layer root-config @kind data */
const USAGE_SUFFIX = '.usage.ts';

const USAGE_JOB = /\bjob:\s*(['"`])((?:\\.|(?!\1)[^\\])*)\1/;

const ESCAPED = /\\(.)/g;

export { ESCAPED, USAGE_JOB, USAGE_SUFFIX };
