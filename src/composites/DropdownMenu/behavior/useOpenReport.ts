/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';

const useOpenReport = (open: boolean, onOpenChange: ((open: boolean) => void) | undefined): void => {
  const reportRef = useRef(onOpenChange);
  reportRef.current = onOpenChange;

  useEffect(() => {
    reportRef.current?.(open);
  }, [open]);
};

export { useOpenReport };
