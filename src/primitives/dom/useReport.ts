/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';

const useReport = <T>(value: T, report: ((value: T) => void) | undefined): void => {
  const reportRef = useRef(report);
  reportRef.current = report;

  useEffect(() => {
    reportRef.current?.(value);
  }, [value]);
};

export { useReport };
