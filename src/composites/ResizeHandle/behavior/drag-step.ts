/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { FoldSide } from '../ResizeHandle.type';
import type { DragOrigin } from './drag-origin.type';
import type { DragRules, DragStep } from './drag-step.type';

const rebased = (origin: DragOrigin, pointer: number, start: number, folded: FoldSide | null): DragOrigin => (
  { ...origin, pointer, start, last: start, folded, moved: true }
);

const foldedStep = (origin: DragOrigin, pointer: number, raw: number, rules: DragRules): DragStep => {
  const { folded, snap } = origin;
  if (folded === 'low' && raw >= snap) return { origin: rebased(origin, pointer, rules.min, null), outcome: { kind: 'unfold', side: 'low', to: rules.min } };
  if (folded === 'high' && raw <= rules.max - snap) return { origin: rebased(origin, pointer, rules.max, null), outcome: { kind: 'unfold', side: 'high', to: rules.max } };
  return { origin, outcome: null };
};

const openStep = (origin: DragOrigin, pointer: number, raw: number, rules: DragRules): DragStep => {
  const { min, max, sides } = rules;
  if (sides.includes('low') && raw < min - origin.snap) return { origin: rebased(origin, pointer, 0, 'low'), outcome: { kind: 'fold', side: 'low' } };
  if (sides.includes('high') && raw > max + origin.snap) return { origin: rebased(origin, pointer, max, 'high'), outcome: { kind: 'fold', side: 'high' } };
  const to = clampNumber(raw, min, max);
  if (to === origin.last) return { origin, outcome: null };
  return { origin: { ...origin, last: to, moved: true }, outcome: { kind: 'resize', to, from: origin.last } };
};

const dragStep = (origin: DragOrigin, pointer: number, rules: DragRules): DragStep => {
  const raw = origin.start + (origin.sign * (pointer - origin.pointer)) / origin.pixelsPerUnit;
  return origin.folded === null ? openStep(origin, pointer, raw, rules) : foldedStep(origin, pointer, raw, rules);
};

export { dragStep };
