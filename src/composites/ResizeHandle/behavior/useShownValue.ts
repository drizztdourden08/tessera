/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';

const useShownValue = (value: number | undefined, measure: (() => number) | undefined) => {
  const [measured, setMeasured] = useState<number>();
  const refresh = useCallback(() => {
    if (value === undefined && measure) setMeasured(measure());
  }, [measure, value]);
  return { shown: value ?? measured, refresh };
};

export { useShownValue };
