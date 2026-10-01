/* @layer renderer-components @kind util */
import type { WizardStepDef, WizardValues } from './wizard.type';

const currentIndex = <V extends WizardValues>(
  steps: readonly WizardStepDef<V>[],
  visible: readonly WizardStepDef<V>[],
  currentId: string,
): number => {
  const shown = visible.findIndex((step) => step.id === currentId);
  if (shown >= 0) return shown;
  const order = steps.findIndex((step) => step.id === currentId);
  const before = visible.filter((step) => steps.indexOf(step) < order);
  return Math.max(before.length - 1, 0);
};

export { currentIndex };
