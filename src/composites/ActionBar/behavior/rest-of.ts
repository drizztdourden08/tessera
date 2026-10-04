/* @layer renderer-components @kind util */
import type { ActionItem } from '../ActionBar.type';

const restOf = (actions: readonly ActionItem[]): ActionItem[] => actions.filter((action) => action.kind !== 'primary');

export { restOf };
