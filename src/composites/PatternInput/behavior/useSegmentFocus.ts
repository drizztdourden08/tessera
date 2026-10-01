/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import { applyCaret } from './apply-caret';
import type { CaretPlace, SegmentFocus } from './pattern-field.type';

const useSegmentFocus = (): SegmentFocus => {
  const nodes = useRef(new Map<number, HTMLElement>());
  const caretRef = useRef<CaretPlace | null>(null);

  const register = useCallback((index: number) => (node: HTMLElement | null) => {
    if (node === null) nodes.current.delete(index);
    else nodes.current.set(index, node);
  }, []);

  const moveTo = useCallback((index: number, place: CaretPlace): boolean => {
    const node = nodes.current.get(index);
    if (node === undefined || node.matches(':disabled')) return false;
    if (node.ownerDocument.activeElement === node) {
      applyCaret(node, place);
      return true;
    }
    caretRef.current = place;
    node.focus();
    return true;
  }, []);

  return { caretRef, register, moveTo };
};

export { useSegmentFocus };
