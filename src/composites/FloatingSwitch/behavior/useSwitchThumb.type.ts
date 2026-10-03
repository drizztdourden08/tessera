/* @layer renderer-components @kind types */
import type { CSSProperties, RefObject } from 'react';

interface ThumbBox {
  start: number;
  size: number;
}

interface SwitchThumb {
  trackRef: RefObject<HTMLElement | null>;
  thumbStyle: CSSProperties;
  shown: boolean;
  gliding: boolean;
}

export type { SwitchThumb, ThumbBox };
