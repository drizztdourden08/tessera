/* @layer renderer-components @kind logic */
import type { WizardAction, WizardState, WizardValues } from './wizard.type';

const withError = (errors: Readonly<Record<string, string>>, id: string, error: string | null): Readonly<Record<string, string>> => {
  const { [id]: _dropped, ...rest } = errors;
  return error === null ? rest : { ...rest, [id]: error };
};

const visit = (visited: readonly string[], id: string): readonly string[] => (visited.includes(id) ? visited : [...visited, id]);

const wizardReducer = <V extends WizardValues>(state: WizardState<V>, action: WizardAction<V>): WizardState<V> => {
  switch (action.type) {
    case 'go':
      return { ...state, currentId: action.id, visited: visit(state.visited, action.id) };
    case 'update':
      return { ...state, values: { ...state.values, ...action.patch }, errors: {}, finished: false };
    case 'error':
      return { ...state, errors: withError(state.errors, action.id, action.error) };
    case 'finish-start':
      return { ...state, busy: true, errors: {} };
    case 'finish-end':
      return { ...state, busy: false, finished: action.error === null, errors: withError(state.errors, action.id, action.error) };
    case 'reset':
      return { currentId: action.currentId, visited: [action.currentId], errors: {}, values: action.values, busy: false, finished: false };
    default:
      return state;
  }
};

export { wizardReducer };
