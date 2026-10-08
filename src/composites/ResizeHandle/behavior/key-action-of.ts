/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { STEP_KEYS } from '../ResizeHandle.constants';
import { dragSignOf } from './drag-sign-of';
import type { KeyAction, KeyPress, KeyRules } from './key-action.type';

const commandOf = (key: string, rules: KeyRules): KeyAction => {
  if (key === 'Home') return { kind: 'move', to: rules.min };
  if (key === 'End') return { kind: 'move', to: rules.max };
  if (key === 'Enter' && rules.canCollapse) return { kind: 'collapse' };
  if ((key === 'Enter' || key === ' ') && rules.canReset) return { kind: 'reset' };
  return null;
};

const keyActionOf = (press: KeyPress, from: number, rules: KeyRules): KeyAction => {
  const direction = STEP_KEYS[rules.orientation][press.key];
  if (direction === undefined) return commandOf(press.key, rules);
  const sign = dragSignOf(press.currentTarget, rules.orientation, rules.edge);
  const step = press.shiftKey ? rules.largeStep : rules.step;
  return { kind: 'move', to: clampNumber(from + direction * sign * step, rules.min, rules.max) };
};

export { keyActionOf };
