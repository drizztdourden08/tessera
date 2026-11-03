/* @layer renderer-components @kind types */
import type { PointerEvent, RefObject } from 'react';
import type { ReorderDrag } from './reorder.type';

interface ThresholdInput<K> {
  raw: ReturnType<ReorderDrag['handlers']>;
  start: { x: number; y: number } | null;
  setStart: (point: { x: number; y: number } | null) => void;
  setTarget: (target: K | null) => void;
  landing: RefObject<K | null>;
  swallow: RefObject<boolean>;
}

interface ThresholdHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: () => void;
}

export type { ThresholdHandlers, ThresholdInput };
