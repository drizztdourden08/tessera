/* @layer renderer-components @kind logic */
import type { SidePanelLook } from './side-panel-look.type';

const sidePanelClass = (look: SidePanelLook, className?: string): string => [
  'side-panel',
  `side-panel--${look.side}`,
  look.collapsible && 'side-panel--collapsible',
  look.collapsed && 'side-panel--collapsed',
  look.dragging && 'side-panel--dragging',
  className,
].filter(Boolean).join(' ');

export { sidePanelClass };
