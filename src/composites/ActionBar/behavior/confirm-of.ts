/* @layer renderer-components @kind util */
import type { ActionConfirm, ActionItem } from '../ActionBar.type';

const confirmOf = (action: ActionItem, question: (label: string) => string): ActionConfirm | undefined => {
  if (action.confirm) return action.confirm;
  if (action.kind !== 'danger') return undefined;
  return { title: question(action.label), confirmLabel: action.label };
};

export { confirmOf };
