/* @layer renderer-components @kind logic */
import type { SplitOrientation } from '../SplitPane.type';
import type { DragOrigin } from './drag-origin.type';

const shareAt = (origin: DragOrigin, event: { clientX: number; clientY: number }, orientation: SplitOrientation): number => {
  const pointer = orientation === 'horizontal' ? event.clientX : event.clientY;
  return origin.share + origin.sign * (pointer - origin.pointer) / origin.span;
};

export { shareAt };
