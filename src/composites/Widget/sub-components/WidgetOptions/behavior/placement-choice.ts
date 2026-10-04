/* @layer renderer-components @kind logic */
import type { DockEdge } from '../../../../DockLayout';
import type { WidgetPlacement } from '../../../Widget.type';
import type { PlacementChoice } from '../WidgetOptions.type';

const placementChoice = (placement: WidgetPlacement, dockEdge: DockEdge | undefined): PlacementChoice | '' => {
  if (placement === 'popped') return 'window';
  if (placement === 'floating') return 'float';
  return dockEdge ?? '';
};

export { placementChoice };
