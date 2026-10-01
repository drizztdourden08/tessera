/* @layer renderer-components @kind data */
import type { PatternFocus } from './pattern-field.type';

const CLOSED_FOCUS: PatternFocus = { index: null, open: false };

const SLOT_ATTRIBUTE = 'data-pattern-slot';

const SLOT_SELECTOR = `[${SLOT_ATTRIBUTE}]`;

const ELEMENT_NODE = 1;

const FOCUS_TAKERS = 'input, textarea, select, [contenteditable="true"]';

export { CLOSED_FOCUS, ELEMENT_NODE, FOCUS_TAKERS, SLOT_ATTRIBUTE, SLOT_SELECTOR };
