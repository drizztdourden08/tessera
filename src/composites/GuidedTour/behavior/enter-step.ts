/* @layer renderer-components @kind logic */
import { devWarn } from '../../../primitives/dom/dev-warn';
import { seekTarget } from './seek-target';
import type { StepEntry } from './tour-internal.type';

const runHook = async (entry: StepEntry, name: 'onEnter' | 'reveal'): Promise<void> => {
  const { step, signal, warn = devWarn } = entry;
  try {
    await step[name]?.({ signal });
  } catch (error) {
    if (!signal.aborted) warn(`GuidedTour: ${name} of step ${step.id} failed: ${String(error)}`);
  }
};

const isLeft = (entry: StepEntry): boolean => entry.signal.aborted;

const bringIn = async (entry: StepEntry): Promise<HTMLElement | null> => {
  if (entry.step.reveal) {
    await runHook(entry, 'reveal');
    if (isLeft(entry)) return null;
    await entry.frame();
  }
  return seekTarget(entry);
};

const enterStep = async (entry: StepEntry): Promise<HTMLElement | null> => {
  const { step, warn = devWarn } = entry;
  await runHook(entry, 'onEnter');
  if (!step.target || step.intro || isLeft(entry)) return null;
  const target = await bringIn(entry);
  if (!target) {
    if (!isLeft(entry)) warn(`GuidedTour: step ${step.id} found no target, so its bubble shows in the middle.`);
    return null;
  }
  if (isLeft(entry)) return null;
  entry.scroll?.(target);
  await entry.frame();
  return target;
};

export { enterStep };
