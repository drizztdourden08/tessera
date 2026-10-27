/* @layer renderer-components @kind util */
import type { DrawnStatus, StatusClassLook } from '../Status.type';

const statusClass = (drawn: DrawnStatus, look: StatusClassLook, className: string): string => [
  'status', `status--${look.variant}`, `status--${drawn.tone}`, look.size === 'sm' && 'status--sm', look.withDot && 'status--dot', drawn.pulse && 'status--pulse', className,
].filter(Boolean).join(' ');

export { statusClass };
