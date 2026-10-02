/* @layer renderer-components @kind util */
import type { PatternSlotSpec } from './parse-pattern.type';

const segmentClass = (slot: PatternSlotSpec, shaded: boolean): string => [
  'dynamic-input__segment',
  `dynamic-input__segment--${slot.type}`,
  slot.muted === true ? 'dynamic-input__segment--muted' : '',
  slot.fill === true ? 'dynamic-input__segment--fill' : '',
  shaded ? 'dynamic-input__segment--shaded' : '',
].filter(Boolean).join(' ');

export { segmentClass };
