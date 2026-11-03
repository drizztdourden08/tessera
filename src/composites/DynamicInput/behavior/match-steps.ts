/* @layer renderer-components @kind logic */
import { pasteEnds } from './paste-ends';
import { slotFromText } from './slot-from-text';
import type { PatternValue } from '../DynamicInput.type';
import type { PasteScan } from './split-pasted.type';

const matchSteps = (scan: PasteScan, index: number, from: number, assigned: PatternValue): PatternValue | undefined => {
  const step = scan.steps[index];
  if (step === undefined) return from >= scan.text.length ? assigned : undefined;
  for (const cut of pasteEnds(scan, step, from, assigned)) {
    const value = slotFromText(step.slot, scan.text.slice(from, cut.end), scan.choices(step.slot, assigned));
    if (value === undefined) continue;
    const found = matchSteps(scan, index + 1, cut.next, { ...assigned, [step.slot.name]: value });
    if (found !== undefined) return found;
  }
  return undefined;
};

export { matchSteps };
