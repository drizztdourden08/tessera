/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { measureToolbarFrame } from './measure-toolbar-frame';
import type { ToolbarFrame } from './toolbar-drag.type';
import type { ToolbarLayout } from '../ToolbarDock.type';

const sameFrame = (a: ToolbarFrame | null, b: ToolbarFrame): boolean => a !== null && JSON.stringify(a) === JSON.stringify(b);

const useToolbarMetrics = (rootRef: RefObject<HTMLElement | null>, layout: ToolbarLayout): ToolbarFrame | null => {
  const [metrics, setMetrics] = useState<ToolbarFrame | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const read = () => {
      const next = measureToolbarFrame(root);
      setMetrics((current) => (sameFrame(current, next) ? current : next));
    };
    read();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(read);
    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef, layout]);

  return metrics;
};

export { useToolbarMetrics };
