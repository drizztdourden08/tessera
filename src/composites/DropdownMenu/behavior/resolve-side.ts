/* @layer renderer-components @kind util */
import { SIDE_ROOM } from '../DropdownMenu.constants';
import type { MenuSide } from '../DropdownMenu.type';

const resolveSide = (side: MenuSide, rect: Pick<DOMRect, 'left' | 'right'>, viewWidth: number): MenuSide => {
  if (side !== 'right' && side !== 'left') return side;
  const after = viewWidth - rect.right;
  const before = rect.left;
  if (side === 'right') return after < SIDE_ROOM && before > after ? 'left' : 'right';
  return before < SIDE_ROOM && after > before ? 'right' : 'left';
};

export { resolveSide };
