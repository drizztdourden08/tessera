/* @layer renderer-components @kind util */
import type { DropStyle } from './listbox-view.type';
import type { ListboxDrop } from './listbox-drop.type';

const dropStyle = (drop: ListboxDrop<HTMLElement>): DropStyle | undefined => {
  const { placement, width, inline } = drop;
  if (inline || placement === null) return undefined;
  return {
    top: placement.top,
    left: placement.left,
    width: width ?? undefined,
    '--listbox-attach': `${placement.anchorWidth}px`,
    '--listbox-space': `${Math.max(placement.space, 0)}px`,
  };
};

export { dropStyle };
