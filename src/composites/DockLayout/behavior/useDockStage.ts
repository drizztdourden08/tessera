/* @layer renderer-components @kind hook */
import { useEffect, useMemo, useRef } from 'react';
import type { RefObject } from 'react';
import { GAP } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import type { DockStage, DockStageParams } from './dock-hooks.type';
import type { DragContext } from './drag.type';
import { layoutTree } from './layout-tree';
import { mainRectOf } from './main-rect-of';
import { sameRect } from './same-rect';
import { useStageSize } from './useStageSize';

const useDockStage = (stageRef: RefObject<HTMLElement | null>, params: DockStageParams): DockStage => {
  const { layout, peek, modifiers, labelOf, mainLabel, strings, canPopOut, onMainRect } = params;
  const size = useStageSize(stageRef);
  const stage = useMemo<Rect>(() => ({ x: 0, y: 0, width: size?.width ?? 0, height: size?.height ?? 0 }), [size]);
  const laid = useMemo(() => {
    if (!size) return null;
    const inner = { x: GAP, y: GAP, width: Math.max(0, size.width - GAP * 2), height: Math.max(0, size.height - GAP * 2) };
    return layoutTree(layout.dock, inner, peek);
  }, [layout.dock, peek, size]);
  const mainRect = useMemo(() => (laid ? mainRectOf(laid) : null), [laid]);

  const reported = useRef<Rect | null>(null);
  useEffect(() => {
    if (sameRect(reported.current, mainRect)) return;
    reported.current = mainRect;
    onMainRect?.(mainRect);
  }, [mainRect, onMainRect]);

  const context = useMemo<DragContext>(
    () => ({ laid, layout, mainRect, stage, modifiers, labelOf, mainLabel, strings, canPopOut }),
    [laid, layout, mainRect, stage, modifiers, labelOf, mainLabel, strings, canPopOut],
  );
  return { laid, mainRect, context };
};

export { useDockStage };
