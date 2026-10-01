/* @layer renderer-components @kind util */
import type { WizardStepDef, WizardValues } from '../../wizard.type';
import type { WizardProgressStep } from '../../WizardProgress/WizardProgress.type';
import type { WizardStepInfo } from '../WizardFrame.type';

const progressSteps = <V extends WizardValues>(
  steps: readonly WizardStepDef<V>[],
  info: Readonly<Record<string, WizardStepInfo>> | undefined,
): readonly WizardProgressStep[] =>
  steps.map((step) => ({ id: step.id, label: step.label, ...info?.[step.id] }));

export { progressSteps };
