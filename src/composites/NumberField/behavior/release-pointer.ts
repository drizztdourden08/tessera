/* @layer renderer-components @kind util */
import type { PointerEvent } from 'react';

const releasePointer = (event: PointerEvent<HTMLElement>): void => {
  if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
};

export { releasePointer };
