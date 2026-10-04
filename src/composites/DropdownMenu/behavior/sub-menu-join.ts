/* @layer renderer-components @kind util */
import { JOIN_MARGIN } from '../DropdownMenu.constants';
import { joinBend } from './join-bend';
import { joinPlace } from './join-place';
import { sideCorners } from './side-corners';
import { tunnelSpan } from './tunnel-span';
import type { JoinEnds, JoinSide, SubMenuJoin, SubMenuJoinInput } from './sub-menu-join.type';

const pickSide = (input: SubMenuJoinInput): JoinSide => {
  const roomRight = input.viewWidth - JOIN_MARGIN - (input.parent.right + input.gap);
  const roomLeft = input.parent.left - input.gap - JOIN_MARGIN;
  return input.width <= roomRight || roomRight >= roomLeft ? 'right' : 'left';
};

const parentEnds = (input: SubMenuJoinInput, side: JoinSide, edges: [top: number, bottom: number], flat: [boolean, boolean]): JoinEnds => {
  const { parent, line, gap } = input;
  const [top, bottom] = sideCorners(input, side);
  return {
    top: joinBend(edges[0] - line - parent.top, top, flat[0] ? 0 : gap / 2),
    bottom: joinBend(parent.bottom - edges[1] - line, bottom, flat[1] ? 0 : gap / 2),
  };
};

const subMenuJoin = (input: SubMenuJoinInput): SubMenuJoin => {
  const { row, parent, width, line, radius, gap } = input;
  const side = pickSide(input);
  const { align, top, height } = joinPlace(input);
  const { flat, tunnelTop, tunnelBottom } = tunnelSpan(input, side, top, height);
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
    parentEnds: parentEnds(input, side, [top + tunnelTop, top + tunnelBottom], flat),
    ownEnds: {
      top: joinBend(tunnelTop - line, radius, gap / 2),
      bottom: joinBend(height - tunnelBottom - line, radius, gap / 2),
    },
    line,
    ring: input.ring,
  };
};

export { subMenuJoin };
