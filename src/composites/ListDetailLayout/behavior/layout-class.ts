/* @layer renderer-components @kind logic */
import type { LayoutLook } from './layout-look.type';

const layoutClass = (look: LayoutLook, className?: string): string => [
  'list-detail-layout',
  look.resizable && 'list-detail-layout--resizable',
  look.collapsed && 'list-detail-layout--collapsed',
  look.dragging && 'list-detail-layout--dragging',
  className,
].filter(Boolean).join(' ');

export { layoutClass };
