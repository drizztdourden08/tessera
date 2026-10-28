/* @layer renderer-components @kind util */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { StepConfig } from '../NumberField.type';
import { ladderStep } from './ladder-step';

const stepNumber = (value: number, count: number, config: StepConfig): number => {
  const { step, fineStep, min, max, ladder, fine } = config;
  const from = Number.isFinite(value) ? value : (min ?? 0);
  const stops = fine ? undefined : ladder;
  const moved = stops !== undefined && stops.length > 0 ? ladderStep(from, count, stops) : from + count * (fine ? fineStep : step);
  return Number(clampNumber(moved, min, max).toFixed(6));
};

export { stepNumber };
