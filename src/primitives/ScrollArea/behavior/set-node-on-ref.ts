/* @layer renderer-components @kind util */
import type { Ref } from 'react';

const setNodeOnRef = <T>(ref: Ref<T> | null | undefined, node: T | null): void => {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(node);
    return;
  }
  (ref as { current: T | null }).current = node;
};

export { setNodeOnRef };
