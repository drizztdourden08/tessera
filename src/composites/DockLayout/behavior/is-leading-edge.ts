/* @layer renderer-components @kind logic */
import type { DockEdge } from '../DockLayout.type';

const isLeadingEdge = (edge: DockEdge): boolean => edge === 'left' || edge === 'top';

export { isLeadingEdge };
