/* @layer renderer-components @kind util */
import type { DropPlacement } from './drop-placement.type';

const dropShape = (position: DropPlacement | null, width: number | null) => ({
  fillet: position !== null && width !== null && width > position.anchorWidth + 1,
  attach: position?.dropUp === true ? 'up' as const : 'down' as const,
  end: position?.end === true,
});

export { dropShape };
