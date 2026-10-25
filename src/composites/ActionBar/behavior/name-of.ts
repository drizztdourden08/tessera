/* @layer renderer-components @kind util */
import type { ActionItem } from '../ActionBar.type';

const nameOf = (action: Pick<ActionItem, 'label' | 'nameSuffix'>): string => (action.nameSuffix ? `${action.label} ${action.nameSuffix}` : action.label);

export { nameOf };
