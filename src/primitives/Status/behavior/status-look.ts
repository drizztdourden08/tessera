/* @layer renderer-components @kind util */
import type { DrawnStatus, StatusClassLook, StatusLookInput } from '../Status.type';

const statusLook = (given: StatusLookInput, drawn: DrawnStatus): StatusClassLook => ({
  variant: given.variant ?? 'text',
  size: given.size ?? 'md',
  dotSize: given.dotSize ?? 'md',
  halo: given.halo ?? false,
  withDot: (given.dot === true || given.halo === true) && !drawn.icon,
});

export { statusLook };
