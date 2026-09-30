/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import type { Rect } from '../DockLayout.type';
import { inRect } from './in-rect';

const useMainHover = (rect: Rect, stageRef: RefObject<HTMLElement | null>): boolean => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const view = ownerWindowOf(stageRef.current);
    const onMove = (e: PointerEvent): void => {
      const stage = stageRef.current;
      if (!stage) return;
      const box = stage.getBoundingClientRect();
      const over = inRect({ x: e.clientX - box.left, y: e.clientY - box.top }, rect);
      setHovered((prev) => (prev === over ? prev : over));
    };
    view.addEventListener('pointermove', onMove);
    return () => view.removeEventListener('pointermove', onMove);
  }, [rect, stageRef]);

  return hovered;
};

export { useMainHover };
