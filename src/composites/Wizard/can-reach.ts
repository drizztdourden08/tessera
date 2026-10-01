/* @layer renderer-components @kind util */
import { stepProblem } from './step-problem';
import type { WizardStepDef, WizardValues } from './wizard.type';

const canReach = <V extends WizardValues>(
  visible: readonly WizardStepDef<V>[],
  from: number,
  id: string,
  state: { visited: readonly string[]; values: V },
): boolean => {
  const target = visible.findIndex((step) => step.id === id);
  if (target < 0 || target === from) return false;
  if (target < from) return true;
  const between = visible.slice(from, target);
  const passable = between.every((step) => stepProblem(step, state.values) === null);
  const known = between.slice(1).every((step) => state.visited.includes(step.id));
  return passable && known;
};

export { canReach };
