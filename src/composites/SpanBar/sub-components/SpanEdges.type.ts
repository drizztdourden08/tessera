/* @layer renderer-components @kind types */
import type { PointerEvent } from 'react';
import type { SpanDragMode } from '../behavior/span-drag.type';

interface SpanEdgesProps {
  readOnly: boolean;
  press: (mode: SpanDragMode) => (event: PointerEvent<HTMLElement>) => void;
}

export type { SpanEdgesProps };
