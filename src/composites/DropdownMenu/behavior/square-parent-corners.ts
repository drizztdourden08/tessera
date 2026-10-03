/* @layer renderer-components @kind util */
import type { SubMenuJoin } from './sub-menu-join.type';

const squareParentCorners = (parent: HTMLElement, join: SubMenuJoin): (() => void) => {
  const edge = join.side === 'right' ? 'right' : 'left';
  const corners = [
    join.topEnd === 'inside' ? null : `border-top-${edge}-radius`,
    join.bottomEnd === 'inside' ? null : `border-bottom-${edge}-radius`,
  ].filter((corner): corner is string => corner !== null);
  corners.forEach((corner) => parent.style.setProperty(corner, '0px'));
  return () => corners.forEach((corner) => parent.style.removeProperty(corner));
};

export { squareParentCorners };
