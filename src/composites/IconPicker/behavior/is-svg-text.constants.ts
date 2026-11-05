/* @layer renderer-components @kind constants */
const PROLOG = /^(<\?xml[^>]*\?>\s*)?(<!--[\s\S]*?-->\s*)*(<!DOCTYPE[^>]*>\s*)?/i;

const SVG_ROOT = /^<svg[\s>]/i;

const BOM = String.fromCodePoint(0xfeff);

export { BOM, PROLOG, SVG_ROOT };
