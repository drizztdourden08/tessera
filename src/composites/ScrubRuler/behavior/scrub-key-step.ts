/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { SCRUB_KEY_STEPS } from '../ScrubRuler.constants';
import type { ScrubKeyInput } from './scrub-key-step.type';

const scrubKeyStep = (key: ScrubKeyInput, value: number, total: number): number | null => {
  if (key.alt || key.ctrl || key.meta || total === 0) return null;
  if (key.key === 'Home') return 0;
  if (key.key === 'End') return total - 1;
  const step = SCRUB_KEY_STEPS[key.key];
  return step === undefined ? null : clampNumber(value + step, 0, total - 1);
};

export { scrubKeyStep };
