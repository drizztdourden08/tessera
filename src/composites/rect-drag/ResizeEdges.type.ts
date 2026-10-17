/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { ResizeEdge } from './rect-drag.type';

interface ResizeEdgesProps {
  onPointerDown: (edge: ResizeEdge, event: ReactPointerEvent<HTMLElement>) => void;
}

export type { ResizeEdgesProps };
