/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { RefCallback } from 'react';
import { attachRef } from './attach-ref';
import type { RowRefDetach } from './attach-ref.type';
import type { UseRowRefInput } from './useRowRef.type';

const useRowRef = <T>(input: UseRowRefInput<T>): RefCallback<HTMLElement> | undefined => {
  const { rowRef, row, id } = input;
  const latest = useRef({ rowRef, row });
  latest.current = { rowRef, row };
  const detach = useRef<RowRefDetach | null>(null);

  const callback = useCallback((element: HTMLElement | null) => {
    detach.current?.();
    detach.current = null;
    const target = latest.current.rowRef?.(latest.current.row, id);
    if (element && target) detach.current = attachRef(target, element);
  }, [id]);

  return rowRef ? callback : undefined;
};

export { useRowRef };
