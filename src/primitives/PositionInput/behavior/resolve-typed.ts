/* @layer renderer-components @kind logic */
import { isValidForAxis } from './is-valid-for-axis';
import type { TypedOutcome } from './draft-rules.type';
import type { PositionAxis } from '../PositionInput.type';

const resolveTyped = (typed: number, axis: PositionAxis = {}): TypedOutcome =>
  isValidForAxis(typed, axis) ? { kind: 'emit', value: typed } : { kind: 'hold', draft: typed };

export { resolveTyped };
