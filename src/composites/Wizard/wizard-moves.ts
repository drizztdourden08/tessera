/* @layer renderer-components @kind util */
import type { Dispatch } from 'react';
import type { WizardAction, WizardMoves, WizardValues, WizardView } from './wizard.type';

const wizardMoves = <V extends WizardValues>(view: WizardView<V>, dispatch: Dispatch<WizardAction<V>>): WizardMoves<V> => {
  const go = (id: string | undefined) => {
    if (id !== undefined) dispatch({ type: 'go', id });
  };
  const update = (patch: Partial<V>) => dispatch({ type: 'update', patch });
  const setValue = <K extends keyof V>(key: K, value: V[K]) => {
    const patch: Partial<V> = {};
    patch[key] = value;
    update(patch);
  };
  return {
    goNext: () => go(view.invalid === null ? view.steps[view.index + 1]?.id : undefined),
    goBack: () => go(view.steps[view.index - 1]?.id),
    goTo: (id) => go(view.canGoTo(id) ? id : undefined),
    update,
    setValue,
    setError: (id, error) => dispatch({ type: 'error', id, error }),
  };
};

export { wizardMoves };
