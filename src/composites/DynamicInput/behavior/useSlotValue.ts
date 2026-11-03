/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { PatternSlotValue, PatternValue } from '../DynamicInput.type';

const useSlotValue = (value: PatternValue, onChange: (next: PatternValue) => void, prune: (next: PatternValue) => PatternValue) => {
  const latest = useRef(value);
  const report = useRef(onChange);
  const settle = useRef(prune);
  latest.current = value;
  report.current = onChange;
  settle.current = prune;

  return useCallback((name: string, next: PatternSlotValue) => {
    if (latest.current[name] === next) return;
    const merged = settle.current({ ...latest.current, [name]: next });
    latest.current = merged;
    report.current(merged);
  }, []);
};

export { useSlotValue };
