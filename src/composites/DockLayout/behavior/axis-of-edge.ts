/* @layer renderer-components @kind logic */
import type { DockEdge, SplitAxis } from '../DockLayout.type';

const axisOfEdge = (edge: DockEdge): SplitAxis => (edge === 'left' || edge === 'right' ? 'row' : 'column');

export { axisOfEdge };
