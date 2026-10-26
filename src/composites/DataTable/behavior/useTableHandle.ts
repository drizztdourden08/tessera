/* @layer renderer-components @kind hook */
import { useImperativeHandle, useMemo } from 'react';
import { mergeRefs } from '../../../primitives/dom/merge-refs';
import type { RefCallback } from 'react';
import type { UseTableHandleInput } from './useTableHandle.type';

const useTableHandle = (input: UseTableHandleInput): RefCallback<HTMLElement> => {
  const { ref, getRects, rootRef, scrollRef } = input;
  useImperativeHandle(ref, () => ({ getRects }), [getRects]);
  return useMemo(() => mergeRefs(rootRef, scrollRef), [rootRef, scrollRef]);
};

export { useTableHandle };
