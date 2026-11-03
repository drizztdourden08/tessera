/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { observeResize } from '../../primitives/dom/observe-resize';
import { resolveScrollParent } from './resolve-scroll-parent';
import type { ScrollParentInput } from './virtual.type';

const useScrollParent = (input: ScrollParentInput): void => {
  const { option, rootRef, scrollerRef, onChange } = input;
  useEffect(() => {
    const root = rootRef.current;
    const parent = root && option !== undefined ? resolveScrollParent(option, root) : null;
    scrollerRef.current = parent ?? root;
    if (!parent) return undefined;
    parent.addEventListener('scroll', onChange, { passive: true });
    const stop = observeResize([parent], onChange);
    onChange();
    return () => {
      parent.removeEventListener('scroll', onChange);
      stop();
    };
  }, [option, rootRef, scrollerRef, onChange]);
};

export { useScrollParent };
