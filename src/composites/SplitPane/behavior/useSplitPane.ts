/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useRef, useState } from 'react';
import type { ResizeChange } from '../../ResizeHandle/ResizeHandle.type';
import { pixelsPerPercent } from './pixels-per-percent';
import { settleShare } from './settle-share';
import type { SplitLimits, SplitState } from './split-limits.type';
import { stepShare } from './step-share';
import type { SplitPaneOptions } from './useSplitPane.type';

const useSplitPane = (options: SplitPaneOptions) => {
  const { orientation, defaultRatio, defaultCollapsed, minRatio, maxRatio, snapAt } = options;
  const limits = useMemo<SplitLimits>(() => ({ min: minRatio, max: maxRatio, snapAt }), [maxRatio, minRatio, snapAt]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SplitState>({ collapsed: defaultCollapsed, ratio: defaultRatio });
  const [dragging, setDragging] = useState(false);

  const onResize = useCallback((next: number, change: ResizeChange) => {
    setState((current) => {
      const share = change.by === 'key' ? stepShare(current, (next - change.from) / 100, limits) : next / 100;
      return settleShare(share, limits, current.ratio);
    });
  }, [limits]);

  const expand = useCallback(() => setState({ collapsed: 'none', ratio: defaultRatio }), [defaultRatio]);

  const pixelsPerUnit = useCallback((handle: HTMLElement) => pixelsPerPercent(trackRef.current, handle, orientation), [orientation]);

  return { trackRef, ...state, dragging, limits, onResize, onDragChange: setDragging, expand, pixelsPerUnit };
};

export { useSplitPane };
