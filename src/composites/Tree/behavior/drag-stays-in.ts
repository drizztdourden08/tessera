/* @layer renderer-components @kind logic */
import type { DragEvent } from 'react';

const dragStaysIn = (event: DragEvent<HTMLElement>): boolean =>
  event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget);

export { dragStaysIn };
