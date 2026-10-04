/* @layer renderer-components @kind util */
import { JOIN_MARGIN } from '../DropdownMenu.constants';
import { joinBend } from './join-bend';
import type { JoinEnds, JoinSide, SubMenuJoin, SubMenuJoinInput } from './sub-menu-join.type';

const pickSide = (input: SubMenuJoinInput): JoinSide => {
  const roomRight = input.viewWidth - JOIN_MARGIN - (input.parent.right + input.gap);
  const roomLeft = input.parent.left - input.gap - JOIN_MARGIN;
  return input.width <= roomRight || roomRight >= roomLeft ? 'right' : 'left';
};

const placeTop = (input: SubMenuJoinInput): number => {
  const { row, height, lead, line, viewHeight } = input;
  const onScreen = Math.max(JOIN_MARGIN, Math.min(row.top - lead, viewHeight - JOIN_MARGIN - height));
  return Math.min(row.top - line, Math.max(onScreen, row.bottom + line - height));
};

const parentEnds = (input: SubMenuJoinInput, side: JoinSide, fillet: number): JoinEnds => {
  const { row, parent, parentCorners, line } = input;
  const top = side === 'right' ? parentCorners.topRight : parentCorners.topLeft;
  const bottom = side === 'right' ? parentCorners.bottomRight : parentCorners.bottomLeft;
  return {
    top: joinBend(row.top - line - parent.top, top, fillet),
    bottom: joinBend(parent.bottom - row.bottom - line, bottom, fillet),
  };
};

const subMenuJoin = (input: SubMenuJoinInput): SubMenuJoin => {
  const { row, parent, width, height, line, radius, gap } = input;
  const side = pickSide(input);
  const top = placeTop(input);
  const left = side === 'right' ? parent.right + gap : parent.left - gap - width;
  const fillet = gap / 2;
  return {
    side,
    top,
    left,
    width,
    height,
    rowOffset: top - row.top,
    edgeOffset: side === 'right' ? left - row.right : row.left - (left + width),
    gap,
    tunnelTop: row.top - top,
    tunnelBottom: row.bottom - top,
    parentEnds: parentEnds(input, side, fillet),
    ownEnds: {
      top: joinBend(row.top - line - top, radius, fillet),
      bottom: joinBend(top + height - row.bottom - line, radius, fillet),
    },
    line,
    ring: input.ring,
  };
};

export { subMenuJoin };
