/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { SCRUB_PAGE_STEP } from '../ScrubRuler.constants';
import type { ScrubKeyInput } from './scrub-key-step.type';

const STEPS: Readonly<Record<string, number>> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  PageUp: -SCRUB_PAGE_STEP,
  PageDown: SCRUB_PAGE_STEP,
};

const scrubKeyStep = (key: ScrubKeyInput, value: number, total: number): number | null => {
  if (key.alt || key.ctrl || key.meta || total === 0) return null;
  if (key.key === 'Home') return 0;
  if (key.key === 'End') return total - 1;
  const step = STEPS[key.key];
  return step === undefined ? null : clampNumber(value + step, 0, total - 1);
};

export { scrubKeyStep };
