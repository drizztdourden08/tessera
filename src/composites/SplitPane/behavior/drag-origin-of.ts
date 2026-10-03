/* @layer renderer-components @kind logic */
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { SplitOrientation } from '../SplitPane.type';
import type { DragOrigin } from './drag-origin.type';

const dragOriginOf = (
  event: ReactPointerEvent<HTMLElement>,
  track: HTMLElement | null,
  orientation: SplitOrientation,
  share: number,
): DragOrigin | null => {
  if (!track) return null;
  const room = track.getBoundingClientRect();
  const divider = event.currentTarget.getBoundingClientRect();
  const horizontal = orientation === 'horizontal';
  const span = horizontal ? room.width - divider.width : room.height - divider.height;
  if (span <= 0) return null;
  const rtl = horizontal && getComputedStyle(track).direction === 'rtl';
  return { pointer: horizontal ? event.clientX : event.clientY, share, span, sign: rtl ? -1 : 1 };
};

export { dragOriginOf };
