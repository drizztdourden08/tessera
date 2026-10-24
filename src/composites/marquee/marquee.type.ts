/* @layer renderer-components @kind types */
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import type { Point, Rect } from '../rect-drag/rect-drag.type';

interface MarqueeModifiers {
  add: boolean;
  toggle: boolean;
}

interface MarqueeItem {
  key: string;
  rect: Rect;
}

interface MarqueeOptions {
  containerRef: RefObject<HTMLElement | null>;
  selected: readonly string[];
  onChange: (keys: readonly string[]) => void;
  itemSelector?: string;
  getRects?: () => readonly MarqueeItem[];
  canStart?: (event: ReactPointerEvent<HTMLElement>) => boolean;
  enabled?: boolean;
  threshold?: number;
  autoScroll?: boolean;
}

interface MarqueeBind {
  onPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
}

interface MarqueeSelect {
  rect: Rect | null;
  bind: MarqueeBind;
}

interface MarqueeWiring {
  container: HTMLElement;
  pointerId: number;
  start: Point;
  modifiers: MarqueeModifiers;
  base: readonly string[];
  rectsOf: () => readonly MarqueeItem[];
  threshold: number;
  autoScroll: boolean;
  onRect: (rect: Rect | null) => void;
  onSelect: (keys: readonly string[]) => void;
  onEnd: () => void;
}

export type { MarqueeBind, MarqueeItem, MarqueeModifiers, MarqueeOptions, MarqueeSelect, MarqueeWiring };
