/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';

const segmentClass = (slot: PatternSlotSpec, shaded: boolean): string => [
  'pattern-input__segment',
  `pattern-input__segment--${slot.type}`,
  slot.muted === true ? 'pattern-input__segment--muted' : '',
  slot.fill === true ? 'pattern-input__segment--fill' : '',
  shaded ? 'pattern-input__segment--shaded' : '',
].filter(Boolean).join(' ');

export { segmentClass };
