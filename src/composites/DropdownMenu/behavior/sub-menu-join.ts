/* @layer renderer-components @kind util */
import { JOIN_FLUSH, JOIN_MARGIN } from '../DropdownMenu.constants';
import { joinBend } from './join-bend';
import { joinPlace } from './join-place';
import type { JoinAlign, JoinEnds, JoinSide, SubMenuJoin, SubMenuJoinInput } from './sub-menu-join.type';

const pickSide = (input: SubMenuJoinInput): JoinSide => {
  const roomRight = input.viewWidth - JOIN_MARGIN - (input.parent.right + input.gap);
  const roomLeft = input.parent.left - input.gap - JOIN_MARGIN;
  return input.width <= roomRight || roomRight >= roomLeft ? 'right' : 'left';
};

const pickAlign = (parent: SubMenuJoinInput['parent'], top: number, bottom: number): JoinAlign => {
  if (Math.abs(top - parent.top) <= JOIN_FLUSH) return 'top';
  return Math.abs(bottom - parent.bottom) <= JOIN_FLUSH ? 'bottom' : 'middle';
};

const parentEnds = (input: SubMenuJoinInput, side: JoinSide, edges: [top: number, bottom: number]): JoinEnds => {
  const { parent, parentCorners, line, gap } = input;
  const top = side === 'right' ? parentCorners.topRight : parentCorners.topLeft;
  const bottom = side === 'right' ? parentCorners.bottomRight : parentCorners.bottomLeft;
  return {
    top: joinBend(edges[0] - line - parent.top, top, gap / 2),
    bottom: joinBend(parent.bottom - edges[1] - line, bottom, gap / 2),
  };
};

const subMenuJoin = (input: SubMenuJoinInput): SubMenuJoin => {
  const { row, parent, width, line, radius, gap } = input;
  const side = pickSide(input);
  const { top, height } = joinPlace(input);
  const align = pickAlign(parent, top, top + height);
  const flushBottom = Math.abs(top + height - parent.bottom) <= JOIN_FLUSH;
  const tunnelTop = align === 'top' ? line : row.top - top;
  const tunnelBottom = flushBottom ? height - line : row.bottom - top;
  const left = side === 'right' ? parent.right + gap : parent.left - gap - width;
  return {
    side,
    align,
    top,
    left,
    width,
    height,
    rowOffset: top - row.top,
    edgeOffset: side === 'right' ? left - row.right : row.left - (left + width),
    gap,
    rowTop: row.top - top,
    rowBottom: row.bottom - top,
    tunnelTop,
    tunnelBottom,
    parentEnds: parentEnds(input, side, [top + tunnelTop, top + tunnelBottom]),
    ownEnds: {
      top: joinBend(tunnelTop - line, radius, gap / 2),
      bottom: joinBend(height - tunnelBottom - line, radius, gap / 2),
    },
    line,
    ring: input.ring,
  };
};

export { subMenuJoin };
