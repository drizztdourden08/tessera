/* @layer renderer-components @kind logic */
const PROLOG = /^(<\?xml[^>]*\?>\s*)?(<!--[\s\S]*?-->\s*)*(<!DOCTYPE[^>]*>\s*)?/i;

const SVG_ROOT = /^<svg[\s>]/i;

const isSvgText = (text: string): boolean => SVG_ROOT.test(text.replace(/^﻿/, '').trim().replace(PROLOG, ''));

export { isSvgText };
