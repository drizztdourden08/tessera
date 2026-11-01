/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { mergeHeights } from './merge-heights';
import { pruneHeights } from './prune-heights';
import { NO_HEIGHTS } from './useGridRowHeights.constants';
import type { GridRowHeights, UseGridRowHeightsInput } from './useGridRowHeights.type';

const useGridRowHeights = (input: UseGridRowHeightsInput): GridRowHeights => {
  const { enabled, rows, keyAt } = input;
  const [known, setKnown] = useState(NO_HEIGHTS);
  const latest = useRef(keyAt);
  useEffect(() => {
    latest.current = keyAt;
  });
  const record = useCallback((found: ReadonlyMap<string, number>) => setKnown((before) => mergeHeights(before, found)), []);
  useEffect(() => {
    if (!enabled) return;
    const alive = new Set<string>();
    for (let at = 0; at < rows.length; at += 1) {
      const key = latest.current(at);
      if (key !== undefined) alive.add(key);
    }
    setKnown((before) => pruneHeights(before, alive));
  }, [enabled, rows]);
  return { known: enabled ? known : NO_HEIGHTS, record };
};

export { useGridRowHeights };
