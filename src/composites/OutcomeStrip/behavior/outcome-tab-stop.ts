/* @layer renderer-components @kind logic */
import type { OutcomeStep } from '../OutcomeStrip.type';

const outcomeTabStop = (steps: readonly OutcomeStep[], focused: number | null): number => {
  if (focused !== null && focused < steps.length) return focused;
  return Math.max(steps.findIndex((step) => step.outcome === 'current'), 0);
};

export { outcomeTabStop };
