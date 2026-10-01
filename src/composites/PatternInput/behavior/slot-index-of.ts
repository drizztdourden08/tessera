/* @layer renderer-components @kind util */
import { elementOf } from './element-of';
import { SLOT_ATTRIBUTE, SLOT_SELECTOR } from './pattern-focus.constants';

const slotIndexOf = (node: Node): number | null => {
  const raw = elementOf(node)?.closest(SLOT_SELECTOR)?.getAttribute(SLOT_ATTRIBUTE);
  return raw == null ? null : Number(raw);
};

export { slotIndexOf };
