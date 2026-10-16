/* @layer renderer-components @kind logic */
import { HIT_AREA_CLASS } from '../../../primitives/dom/hit-area.constants';
import type { CollapseToggleSide } from '../CollapseToggle.type';
import { pointsTo } from './points-to';

const collapseToggleClass = (side: CollapseToggleSide, collapsed: boolean, className?: string): string => [
  'collapse-toggle',
  `collapse-toggle--to-${pointsTo(side, collapsed)}`,
  HIT_AREA_CLASS,
  className,
].filter(Boolean).join(' ');

export { collapseToggleClass };
