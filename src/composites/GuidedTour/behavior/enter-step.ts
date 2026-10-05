/* @layer renderer-components @kind logic */
import { devWarn } from '../../../primitives/dom/dev-warn';
import type { StepEntry } from './tour-internal.type';

const seek = async (entry: StepEntry, left: number): Promise<HTMLElement | null> => {
  const found = entry.find();
  if (found || left <= 0) return found;
  await entry.frame();
  return seek(entry, left - 1);
};

const enterStep = async (entry: StepEntry): Promise<HTMLElement | null> => {
  const { step, tries, warn = devWarn } = entry;
  try {
    await step.onEnter?.();
  } catch (error) {
    warn(`GuidedTour: onEnter of step ${step.id} failed: ${String(error)}`);
  }
  if (!step.target) return null;
  const target = await seek(entry, tries);
  if (!target) warn(`GuidedTour: step ${step.id} found no target, so its bubble shows in the middle.`);
  return target;
};

export { enterStep };
