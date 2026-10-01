/* @layer renderer-components @kind util */
import type { WizardState, WizardValues } from './wizard.type';

const initialWizardState = <V extends WizardValues>(values: V, currentId: string): WizardState<V> => ({
  currentId,
  visited: [currentId],
  errors: {},
  values,
  busy: false,
  finished: false,
});

export { initialWizardState };
