/* @layer renderer-components @kind util */
import type { WizardStepDef, WizardValues } from './wizard.type';

const visibleSteps = <V extends WizardValues>(steps: readonly WizardStepDef<V>[], values: V): readonly WizardStepDef<V>[] =>
  steps.filter((step) => step.when === undefined || step.when(values));

export { visibleSteps };
