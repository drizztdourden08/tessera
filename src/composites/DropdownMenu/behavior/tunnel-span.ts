/* @layer renderer-components @kind util */
import { JOIN_FLUSH } from '../DropdownMenu.constants';
import { sideCorners } from './side-corners';
import type { JoinSide, JoinSpan, SubMenuJoinInput } from './sub-menu-join.type';

const level = (a: number, b: number): boolean => Math.abs(a - b) <= JOIN_FLUSH;

const flatEnds = (input: SubMenuJoinInput, top: number, bottom: number): [top: boolean, bottom: boolean] => {
  const { row, parent } = input;
  return [level(top, parent.top) || level(top, row.top), level(bottom, parent.bottom) || level(bottom, row.bottom)];
};

const tunnelSpan = (input: SubMenuJoinInput, side: JoinSide, top: number, height: number): JoinSpan => {
  const { row, parent, line, gap } = input;
  const bottom = top + height;
  const flat = flatEnds(input, top, bottom);
  const [topCorner, bottomCorner] = sideCorners(input, side);
  const snapTop = !flat[0] && top < parent.top && row.top - line - parent.top < topCorner + gap / 2;
  const snapBottom = !flat[1] && bottom > parent.bottom && parent.bottom - row.bottom - line < bottomCorner + gap / 2;
  const edgeTop = snapTop ? parent.top + line : row.top;
  const edgeBottom = snapBottom ? parent.bottom - line : row.bottom;
  return { flat, tunnelTop: flat[0] ? line : edgeTop - top, tunnelBottom: flat[1] ? height - line : edgeBottom - top };
};

export { tunnelSpan };
