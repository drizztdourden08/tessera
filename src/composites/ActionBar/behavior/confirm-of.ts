/* @layer renderer-components @kind util */
import type { ActionConfirm, ActionItem } from '../ActionBar.type';
import { nameOf } from './name-of';

const confirmOf = (action: ActionItem, question: (label: string) => string): ActionConfirm | undefined => {
  const { confirm } = action;
  if (confirm === false) return undefined;
  if (typeof confirm === 'object') return confirm;
  if (confirm !== true && action.kind !== 'danger') return undefined;
  return { title: question(nameOf(action)), confirmLabel: action.label };
};

export { confirmOf };
