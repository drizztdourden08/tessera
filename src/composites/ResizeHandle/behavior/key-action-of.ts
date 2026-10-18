/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { STEP_KEYS } from '../ResizeHandle.constants';
import type { FoldSide, HandleFold } from '../ResizeHandle.type';
import { dragSignOf } from './drag-sign-of';
import type { KeyAction, KeyPress, KeyRules } from './key-action.type';

const openedAt = (side: FoldSide, rules: KeyRules): number => (side === 'low' ? rules.min : rules.max);

const foldKeyOf = (fold: HandleFold, rules: KeyRules): KeyAction => {
  if (fold.folded !== null) return { kind: 'unfold', side: fold.folded, to: openedAt(fold.folded, rules) };
  const [side] = fold.sides;
  return side === undefined ? null : { kind: 'fold', side };
};

const commandOf = (key: string, rules: KeyRules): KeyAction => {
  if (key === 'Enter' && rules.fold) return foldKeyOf(rules.fold, rules);
  if (rules.fold?.folded) return null;
  if (key === 'Home') return { kind: 'move', to: rules.min };
  if (key === 'End') return { kind: 'move', to: rules.max };
  if ((key === 'Enter' || key === ' ') && rules.canReset) return { kind: 'reset' };
  return null;
};

const foldedStepOf = (folded: FoldSide, delta: number, rules: KeyRules): KeyAction => {
  const opens = folded === 'low' ? delta > 0 : delta < 0;
  return opens ? { kind: 'unfold', side: folded, to: openedAt(folded, rules) } : null;
};

const foldAtEdge = (delta: number, from: number, rules: KeyRules): KeyAction => {
  const sides = rules.fold?.sides ?? [];
  if (delta < 0 && from <= rules.min && sides.includes('low')) return { kind: 'fold', side: 'low' };
  if (delta > 0 && from >= rules.max && sides.includes('high')) return { kind: 'fold', side: 'high' };
  return null;
};

const stepActionOf = (delta: number, from: number, rules: KeyRules): KeyAction => {
  const { fold, min, max } = rules;
  if (fold?.folded) return foldedStepOf(fold.folded, delta, rules);
  return foldAtEdge(delta, from, rules) ?? { kind: 'move', to: clampNumber(from + delta, min, max) };
};

const keyActionOf = (press: KeyPress, from: number, rules: KeyRules): KeyAction => {
  const direction = STEP_KEYS[rules.orientation][press.key];
  if (direction === undefined) return commandOf(press.key, rules);
  const sign = dragSignOf(press.currentTarget, rules.orientation, rules.edge);
  const step = press.shiftKey ? rules.largeStep : rules.step;
  return stepActionOf(direction * sign * step, from, rules);
};

export { keyActionOf };
