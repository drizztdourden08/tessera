/* @layer renderer-components @kind util */
import { JOIN_FLUSH, JOIN_MARGIN } from '../DropdownMenu.constants';
import type { JoinEnd, JoinSide, SubMenuJoin, SubMenuJoinInput } from './sub-menu-join.type';

const pickSide = (input: SubMenuJoinInput): JoinSide => {
  const roomRight = input.viewWidth - JOIN_MARGIN - (input.parent.right - input.line);
  const roomLeft = input.parent.left + input.line - JOIN_MARGIN;
  return input.width <= roomRight || roomRight >= roomLeft ? 'right' : 'left';
};

const placeTop = (input: SubMenuJoinInput): number => {
  const { row, parent, height, lead, radius, viewHeight } = input;
  const lowest = viewHeight - JOIN_MARGIN - height;
  const top = Math.max(JOIN_MARGIN, Math.min(row.top - lead, lowest));
  return Math.abs(top - parent.top) < radius ? parent.top : top;
};

const extraHeight = (bottom: number, parentBottom: number, radius: number): number => {
  const gap = parentBottom - bottom;
  if (gap > JOIN_FLUSH && gap < radius) return gap;
  if (gap < -JOIN_FLUSH && gap > -radius) return radius + gap;
  return 0;
};

const endOf = (past: number): JoinEnd => {
  if (past > JOIN_FLUSH) return 'outside';
  return past < -JOIN_FLUSH ? 'inside' : 'flush';
};

const subMenuJoin = (input: SubMenuJoinInput): SubMenuJoin => {
  const { row, parent, width, line, ring, radius } = input;
  const side = pickSide(input);
  const top = placeTop(input);
  const height = input.height + extraHeight(top + input.height, parent.bottom, radius);
  const left = side === 'right' ? parent.right - line : parent.left + line - width;
  return {
    side,
    top,
    left,
    width,
    height,
    rowOffset: top - row.top,
    edgeOffset: side === 'right' ? left - row.right : row.left - (left + width),
    topEnd: endOf(parent.top - top),
    bottomEnd: endOf(top + height - parent.bottom),
    parentTop: parent.top - top,
    parentBottom: parent.bottom - top,
    line,
    ring,
    radius,
  };
};

export { subMenuJoin };
