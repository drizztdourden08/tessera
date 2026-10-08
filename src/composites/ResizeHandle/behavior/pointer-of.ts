/* @layer renderer-components @kind logic */
import type { SplitOrientation } from '../../SplitPane/SplitPane.type';

const pointerOf = (event: { clientX: number; clientY: number }, orientation: SplitOrientation): number =>
  (orientation === 'horizontal' ? event.clientX : event.clientY);

export { pointerOf };
