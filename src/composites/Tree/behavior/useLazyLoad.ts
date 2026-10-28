/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { TreeFlatRow } from '../Tree.type';

const useLazyLoad = <T,>(rows: readonly TreeFlatRow<T>[], onLoadChildren: ((item: T) => void) | undefined): void => {
  const asked = useRef<ReadonlySet<string>>(new Set());
  useEffect(() => {
    const waiting = rows.filter((row) => row.expanded && !row.loaded && !row.loading);
    const next = new Set(waiting.map((row) => row.key));
    if (onLoadChildren) waiting.filter((row) => !asked.current.has(row.key)).forEach((row) => onLoadChildren(row.item));
    asked.current = next;
  }, [rows, onLoadChildren]);
};

export { useLazyLoad };
