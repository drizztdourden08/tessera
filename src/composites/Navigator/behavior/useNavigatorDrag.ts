/* @layer renderer-components @kind hook */
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import { useRectDrag } from '../../rect-drag/useRectDrag';
import type { Point } from '../../rect-drag/rect-drag.type';
import type { NavigatorProps, NavigatorViewport } from '../Navigator.type';
import { centreViewport } from './centre-viewport';
import { moveViewport } from './move-viewport';
import type { NavigatorDrag } from './useNavigatorDrag.type';

const useNavigatorDrag = (props: Pick<NavigatorProps, 'surface' | 'viewport' | 'onViewportChange'>, mapRef: RefObject<HTMLElement | null>): NavigatorDrag => {
  const { surface, viewport, onViewportChange } = props;
  const drag = useRectDrag<NavigatorViewport>();
  const shown = drag.live ?? viewport;

  const unitsPerPixel = (): number => {
    const width = mapRef.current?.getBoundingClientRect().width ?? 0;
    return width > 0 ? surface.width / width : 1;
  };

  const follow = (event: ReactPointerEvent<HTMLElement>, start: NavigatorViewport): void => {
    const scale = unitsPerPixel();
    drag.begin(event, (delta: Point) => {
      const next = moveViewport(start, surface, delta.x * scale, delta.y * scale);
      onViewportChange(next);
      return next;
    }, () => undefined);
  };

  return {
    shown,
    dragging: drag.live !== null,
    onViewportDown: (event) => follow(event, shown),
    onMapDown: (event) => {
      const box = event.currentTarget.getBoundingClientRect();
      const scale = unitsPerPixel();
      const next = centreViewport(shown, surface, { x: (event.clientX - box.left) * scale, y: (event.clientY - box.top) * scale });
      onViewportChange(next);
      follow(event, next);
    },
  };
};

export { useNavigatorDrag };
