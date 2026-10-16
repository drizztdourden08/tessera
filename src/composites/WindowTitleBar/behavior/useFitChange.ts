/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent, useRef } from 'react';
import type { WindowTitleBarItemId, WindowTitleBarProps } from '../WindowTitleBar.type';

const useFitChange = (tucked: readonly WindowTitleBarItemId[], onFitChange: WindowTitleBarProps['onFitChange']): void => {
  const key = JSON.stringify(tucked);
  const reported = useRef(JSON.stringify([]));
  const report = useEffectEvent((list: readonly WindowTitleBarItemId[]) => onFitChange?.(list));

  useEffect(() => {
    if (key === reported.current) return;
    reported.current = key;
    report(JSON.parse(key) as WindowTitleBarItemId[]);
  }, [key]);
};

export { useFitChange };
