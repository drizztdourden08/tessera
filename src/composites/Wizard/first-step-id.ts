/* @layer renderer-components @kind util */
import { visibleSteps } from './visible-steps';
import type { WizardStepDef, WizardValues } from './wizard.type';

const firstStepId = <V extends WizardValues>(steps: readonly WizardStepDef<V>[], values: V): string =>
  visibleSteps(steps, values)[0]?.id ?? steps[0]?.id ?? '';

export { firstStepId };
