/* @layer renderer-components @kind util */
import type { ActionItem, ActionSplit } from '../ActionBar.type';
import { restOf } from './rest-of';

const splitActions = (actions: readonly ActionItem[], keep: number, fit: number): ActionSplit => {
  const rest = restOf(actions);
  const count = Math.max(0, Math.min(keep, fit));
  return {
    primary: actions.filter((action) => action.kind === 'primary'),
    shown: rest.slice(0, count),
    folded: rest.slice(count),
  };
};

export { splitActions };
