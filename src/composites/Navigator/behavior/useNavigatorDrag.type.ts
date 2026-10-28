/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { NavigatorViewport } from '../Navigator.type';

interface NavigatorDrag {
  shown: NavigatorViewport;
  dragging: boolean;
  onViewportDown: (event: ReactPointerEvent<HTMLElement>) => void;
  onMapDown: (event: ReactPointerEvent<HTMLElement>) => void;
}

export type { NavigatorDrag };
