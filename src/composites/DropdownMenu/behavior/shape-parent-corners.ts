/* @layer renderer-components @kind util */
import { joinPx } from './join-px';
import type { SubMenuJoin } from './sub-menu-join.type';

const shapeParentCorners = (parent: HTMLElement, join: SubMenuJoin): (() => void) => {
  const edge = join.side === 'right' ? 'right' : 'left';
  const corners: Array<[string, number]> = [
    [`border-top-${edge}-radius`, join.parentEnds.top.corner],
    [`border-bottom-${edge}-radius`, join.parentEnds.bottom.corner],
  ];
  corners.forEach(([corner, radius]) => parent.style.setProperty(corner, joinPx(radius)));
  return () => corners.forEach(([corner]) => parent.style.removeProperty(corner));
};

export { shapeParentCorners };
