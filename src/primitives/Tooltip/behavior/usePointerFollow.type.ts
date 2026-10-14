/* @layer renderer-components @kind types */
import type { MouseEvent, RefCallback } from 'react';

interface PointerFollow {
  attach: RefCallback<HTMLDivElement>;
  track: (event: MouseEvent<HTMLElement>) => void;
}

export type { PointerFollow };
