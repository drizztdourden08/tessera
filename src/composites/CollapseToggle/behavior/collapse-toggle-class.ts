/* @layer renderer-components @kind logic */
import type { CollapseToggleSide } from '../CollapseToggle.type';
import { pointsTo } from './points-to';

const collapseToggleClass = (side: CollapseToggleSide, collapsed: boolean, className?: string): string => [
  'collapse-toggle',
  `collapse-toggle--to-${pointsTo(side, collapsed)}`,
  className,
].filter(Boolean).join(' ');

export { collapseToggleClass };
