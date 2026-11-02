/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { dragStaysIn } from './drag-stays-in';
import { useSpringOpen } from './useSpringOpen';
import type { NativeSpringInput, TreeNativeOver } from './useNativeSpring.type';

const useNativeSpring = <T,>(input: NativeSpringInput<T>): ((at: number) => TreeNativeOver | undefined) => {
  const { rows, indexOfKey, delay, setExpanded } = input;
  const [over, setOver] = useState<string | null>(null);
  const openKey = useCallback((key: string) => setExpanded(key, true), [setExpanded]);
  const hovered = over === null ? undefined : rows[indexOfKey.get(over) ?? -1];
  useSpringOpen(hovered?.branch && !hovered.expanded ? hovered.key : null, delay, openKey);

  return useCallback((at) => {
    const row = rows[at];
    if (!row?.branch) return undefined;
    return {
      onDragOver: () => setOver(row.key),
      onDragLeave: (event) => {
        if (!dragStaysIn(event)) setOver(null);
      },
      onDrop: () => setOver(null),
    };
  }, [rows]);
};

export { useNativeSpring };
