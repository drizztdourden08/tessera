/* @layer renderer-components @kind util */
import type { ReorderModifier } from './reorder.type';

const modifierOf = (event: { altKey: boolean; ctrlKey: boolean; metaKey: boolean; shiftKey: boolean }): ReorderModifier => {
  if (event.altKey) return 'alt';
  if (event.ctrlKey || event.metaKey) return 'ctrl';
  return event.shiftKey ? 'shift' : 'none';
};

export { modifierOf };
