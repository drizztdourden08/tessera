/* @layer renderer-components @kind util */
import type { WizardStepDef, WizardValues } from './wizard.type';

const ownHint = <V extends WizardValues>(step: WizardStepDef<V>, values: V): string | null =>
  (typeof step.hint === 'function' ? step.hint(values) : step.hint ?? null);

const stepHint = <V extends WizardValues>(step: WizardStepDef<V> | undefined, values: V): string | null => {
  if (step === undefined) return null;
  const problem = step.validate?.(values) ?? null;
  if (problem === null) return ownHint(step, values);
  if (typeof problem === 'string') return problem;
  return problem.inField ? null : problem.message;
};

export { stepHint };
