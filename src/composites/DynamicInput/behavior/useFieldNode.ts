/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef } from 'react';
import { applyCaret } from './apply-caret';
import type { RefCallback, RefObject } from 'react';
import type { CaretPlace, PatternField } from './pattern-field.type';

const useFieldNode = (field: PatternField, index: number, caretRef: RefObject<CaretPlace | null>): RefCallback<HTMLInputElement> => {
  const nodeRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (node === null || caretRef.current === null) return;
    applyCaret(node, caretRef.current);
    caretRef.current = null;
  });

  return useCallback((node: HTMLInputElement | null) => {
    nodeRef.current = node;
    field.register(index)(node);
  }, [field.register, index]);
};

export { useFieldNode };
