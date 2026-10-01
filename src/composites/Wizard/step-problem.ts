/* @layer renderer-components @kind util */
import type { WizardStepDef, WizardValues } from './wizard.type';

const stepProblem = <V extends WizardValues>(step: WizardStepDef<V> | undefined, values: V): string | null => {
  const problem = step?.validate?.(values) ?? null;
  return typeof problem === 'string' || problem === null ? problem : problem.message;
};

export { stepProblem };
