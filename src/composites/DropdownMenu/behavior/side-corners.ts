/* @layer renderer-components @kind util */
import type { JoinSide, SubMenuJoinInput } from './sub-menu-join.type';

const sideCorners = (input: SubMenuJoinInput, side: JoinSide): [top: number, bottom: number] => {
  const { parentCorners } = input;
  return side === 'right' ? [parentCorners.topRight, parentCorners.bottomRight] : [parentCorners.topLeft, parentCorners.bottomLeft];
};

export { sideCorners };
