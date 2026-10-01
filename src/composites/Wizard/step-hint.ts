/* @layer renderer-components @kind util */
import type { WizardStepDef, WizardValues } from './wizard.type';

const stepHint = <V extends WizardValues>(step: WizardStepDef<V> | undefined, values: V): string | null => {
  const problem = step?.validate?.(values) ?? null;
  if (problem === null || typeof problem === 'string') return problem;
  return problem.inField ? null : problem.message;
};

export { stepHint };
