/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { observeResize } from '../../dom/observe-resize';
import type { AsideShownParams, AsideShownState } from './useAsideShown.type';

const useAsideShown = (params: AsideShownParams): AsideShownState => {
  const { breakpoint, onAsideChange } = params;
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState<boolean | null>(null);
  const report = useRef(onAsideChange);
  report.current = onAsideChange;

  useLayoutEffect(() => {
    const element = ref.current;
    if (element === null) return undefined;
    const measure = (): void => setShown(element.clientWidth >= breakpoint);
    measure();
    return observeResize([element], measure);
  }, [breakpoint]);

  useEffect(() => {
    if (shown !== null) report.current?.(shown);
  }, [shown]);

  return { ref, shown: shown === true };
};

export { useAsideShown };
