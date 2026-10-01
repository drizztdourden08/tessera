/* @layer renderer-components @kind logic */
import { settleFinish } from './settle-finish';
import { stepProblem } from './step-problem';
import type { FinishRun } from './finish-wizard.type';
import type { WizardValues } from './wizard.type';

const finishWizard = async <V extends WizardValues>(run: FinishRun<V>): Promise<void> => {
  const { view, state, dispatch, onFinish, onFinished, fallback } = run;
  if (state.busy) return;
  const blocked = view.steps.find((step) => stepProblem(step, state.values) !== null);
  if (blocked) {
    dispatch({ type: 'go', id: blocked.id });
    dispatch({ type: 'error', id: blocked.id, error: stepProblem(blocked, state.values) });
    return;
  }
  dispatch({ type: 'finish-start' });
  const outcome = await settleFinish(onFinish, state.values, fallback);
  dispatch({ type: 'finish-end', id: view.current.id, error: outcome.success ? null : outcome.error });
  if (outcome.success) onFinished?.(outcome.id);
};

export { finishWizard };
