/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { PatternSlotValue, PatternValue } from '../DynamicInput.type';

const useSlotValue = (value: PatternValue, onChange: (next: PatternValue) => void) => {
  const latest = useRef(value);
  const report = useRef(onChange);
  latest.current = value;
  report.current = onChange;

  return useCallback((name: string, next: PatternSlotValue) => {
    if (latest.current[name] === next) return;
    const merged = { ...latest.current, [name]: next };
    latest.current = merged;
    report.current(merged);
  }, []);
};

export { useSlotValue };
