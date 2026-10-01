/* @layer renderer-components @kind data */
import type { PatternSlotType } from './parse-pattern.type';
import type { StepDirection } from './slot-kind.type';

const STEP_KEYS: Readonly<Record<string, StepDirection>> = { ArrowUp: 1, ArrowDown: -1 };

const STEPPED_TYPES: ReadonlySet<PatternSlotType> = new Set(['number', 'decimal', 'hour', 'minute']);

export { STEP_KEYS, STEPPED_TYPES };
