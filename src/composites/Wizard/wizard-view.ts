/* @layer renderer-components @kind util */
import { canReach } from './can-reach';
import { currentIndex } from './current-index';
import { stepHint } from './step-hint';
import { stepProblem } from './step-problem';
import { visibleSteps } from './visible-steps';
import type { WizardState, WizardStepDef, WizardValues, WizardView } from './wizard.type';

const wizardView = <V extends WizardValues>(steps: readonly WizardStepDef<V>[], state: WizardState<V>): WizardView<V> => {
  const shown = visibleSteps(steps, state.values);
  const visible = shown.length > 0 ? shown : steps.slice(0, 1);
  const index = currentIndex(steps, visible, state.currentId);
  const current = visible[index];
  if (current === undefined) throw new Error('useWizard needs at least one step.');
  return {
    steps: visible,
    current,
    index,
    isFirst: index === 0,
    isLast: index === visible.length - 1,
    invalid: stepProblem(current, state.values),
    hint: stepHint(current, state.values),
    canGoTo: (id) => !state.busy && canReach(visible, index, id, state),
  };
};

export { wizardView };
