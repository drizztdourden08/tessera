/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { SUB_MARGIN, SURFACE } from '../ControlMenu.constants';

const subRoom = (row: HTMLElement | null): number => {
  const parent = row?.closest(SURFACE);
  if (!row || !parent) return 0;
  const zoom = cssZoomOf(row);
  const box = parent.getBoundingClientRect();
  const width = ownerWindowOf(row).innerWidth;
  return Math.max(width - box.right, box.left) / zoom - SUB_MARGIN;
};

export { subRoom };
