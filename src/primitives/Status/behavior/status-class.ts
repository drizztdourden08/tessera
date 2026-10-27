/* @layer renderer-components @kind util */
import type { DrawnStatus, StatusClassLook } from '../Status.type';

const statusClass = (drawn: DrawnStatus, look: StatusClassLook, className: string): string => [
  'status', `status--${look.variant}`, `status--${drawn.tone}`, look.size === 'sm' && 'status--sm', look.withDot && 'status--dot', look.withDot && look.dotSize === 'lg' && 'status--dot-lg', look.withDot && look.halo && 'status--halo', drawn.pulse && 'status--pulse', look.reasoned && 'status--reasoned', className,
].filter(Boolean).join(' ');

export { statusClass };
