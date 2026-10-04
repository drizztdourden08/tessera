/* @layer renderer-components @kind util */
import type { StepperStep } from '../../../../primitives/Stepper';
import type { WizardApi, WizardValues } from '../../wizard.type';

const stepperSteps = <V extends WizardValues>(wizard: WizardApi<V>): readonly StepperStep[] =>
  wizard.steps.map((step) => {
    const seen = wizard.visited.includes(step.id) && step.id !== wizard.current.id;
    return {
      id: step.id,
      label: step.label,
      summary: seen ? step.summary?.(wizard.values) : undefined,
      subSteps: typeof step.subSteps === 'function' ? step.subSteps(wizard.values) : step.subSteps,
      error: wizard.errors[step.id] !== undefined,
    };
  });

export { stepperSteps };
