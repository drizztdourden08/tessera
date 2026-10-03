/* @layer renderer-components @kind util */
import type { Ref, RefCallback } from 'react';

const mergeRefs = <T,>(...refs: readonly (Ref<T> | undefined)[]): RefCallback<T> => (node) => {
  for (const ref of refs) {
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  }
};

export { mergeRefs };
