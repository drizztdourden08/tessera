/* @layer renderer-components @kind logic */
import type { HandleLook } from './handle-look.type';

const handleClass = (look: HandleLook): string => [
  'resize-handle',
  `resize-handle--${look.orientation}`,
  !look.filled && `resize-handle--${look.look}`,
  look.dragging && 'resize-handle--dragging',
  'focus-ring-inset',
  look.className,
].filter(Boolean).join(' ');

export { handleClass };
