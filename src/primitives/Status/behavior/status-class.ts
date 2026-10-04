/* @layer renderer-components @kind util */
import type { DrawnStatus, StatusVariant } from '../Status.type';

const statusClass = (drawn: DrawnStatus, variant: StatusVariant, withDot: boolean, className: string): string => [
  'status', `status--${variant}`, `status--${drawn.tone}`, withDot && 'status--dot', drawn.pulse && 'status--pulse', className,
].filter(Boolean).join(' ');

export { statusClass };
