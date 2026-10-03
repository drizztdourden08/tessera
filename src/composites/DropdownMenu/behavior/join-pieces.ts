/* @layer renderer-components @kind util */
import { joinPx } from './join-px';
import type { JoinPiece } from './join-piece.type';
import type { SubMenuJoin } from './sub-menu-join.type';

const fillet = (key: string, left: number, top: number): JoinPiece => ({
  key,
  className: `dropdown__join-fillet dropdown__join-fillet--${key}`,
  style: { left: joinPx(left), top: joinPx(top) },
});

const joinPieces = (join: SubMenuJoin): JoinPiece[] => {
  const { height, parentTop, parentBottom, line, radius, topEnd, bottomEnd } = join;
  const stripTop = Math.max(0, parentTop) + line;
  const stripBottom = Math.min(height, parentBottom) - line;
  const pieces: JoinPiece[] = [{
    key: 'strip',
    className: 'dropdown__join-strip',
    style: { left: joinPx(-line), top: joinPx(stripTop - line), height: joinPx(Math.max(0, stripBottom - stripTop)) },
  }];
  if (topEnd === 'inside') pieces.push(fillet('top-inside', -line, -(radius + line)));
  if (topEnd === 'outside') pieces.push(fillet('top-outside', -(radius + line), parentTop - radius - line));
  if (bottomEnd === 'inside') pieces.push(fillet('bottom-inside', -line, height - 2 * line));
  if (bottomEnd === 'outside') pieces.push(fillet('bottom-outside', -(radius + line), parentBottom - 2 * line));
  return pieces;
};

export { joinPieces };
