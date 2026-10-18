/* @layer renderer-components @kind logic */
import type { LayoutLook } from './layout-look.type';

const layoutClass = (look: LayoutLook, className?: string): string => [
  'list-detail-layout',
  look.collapsed && 'list-detail-layout--collapsed',
  look.detailCollapsed && 'list-detail-layout--detail-collapsed',
  look.dragging && 'list-detail-layout--dragging',
  className,
].filter(Boolean).join(' ');

export { layoutClass };
