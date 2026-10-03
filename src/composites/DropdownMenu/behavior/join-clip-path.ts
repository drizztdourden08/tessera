/* @layer renderer-components @kind util */
import { JOIN_REACH } from '../DropdownMenu.constants';
import { joinPx } from './join-px';
import type { JoinPoint } from './join-point.type';
import type { JoinEnd, SubMenuJoin } from './sub-menu-join.type';

const endPath = (join: SubMenuJoin, end: JoinEnd, edge: number, parentEdge: number): JoinPoint[] => {
  const outward = edge === 0 ? -1 : 1;
  const far = edge + outward * JOIN_REACH;
  const side = join.line + join.ring;
  if (end === 'outside') {
    const cut = parentEdge - outward * join.line;
    return [[-JOIN_REACH, far], [-JOIN_REACH, cut], [0, cut]];
  }
  if (end === 'flush') return [[side, far], [side, edge], [0, edge]];
  return [[0, far]];
};

const joinClipPath = (join: SubMenuJoin): string => {
  const { width, height, parentTop, parentBottom, topEnd, bottomEnd, side } = join;
  const reach = JOIN_REACH;
  const bottom = endPath(join, bottomEnd, height, parentBottom);
  const top = endPath(join, topEnd, 0, parentTop).reverse();
  const points: JoinPoint[] = [[width + reach, -reach], [width + reach, height + reach], ...bottom, ...top];
  const mapped = points.map(([x, y]) => `${joinPx(side === 'right' ? x : width - x)} ${joinPx(y)}`);
  return `polygon(${mapped.join(', ')})`;
};

export { joinClipPath };
