/* @layer renderer-components @kind logic */
import { devWarn } from '../../../primitives/dom/dev-warn';
import { seekTarget } from './seek-target';
import type { StepEntry } from './tour-internal.type';

const enterStep = async (entry: StepEntry): Promise<HTMLElement | null> => {
  const { step, signal, warn = devWarn } = entry;
  try {
    await step.onEnter?.({ signal });
  } catch (error) {
    if (!signal.aborted) warn(`GuidedTour: onEnter of step ${step.id} failed: ${String(error)}`);
  }
  if (!step.target || signal.aborted) return null;
  const target = await seekTarget(entry);
  if (!target && !entry.signal.aborted) warn(`GuidedTour: step ${step.id} found no target, so its bubble shows in the middle.`);
  return target;
};

export { enterStep };
