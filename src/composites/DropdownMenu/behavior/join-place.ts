/* @layer renderer-components @kind util */
import { JOIN_MARGIN } from '../DropdownMenu.constants';
import type { JoinPlace, SubMenuJoinInput } from './sub-menu-join.type';

const rowHeight = (input: SubMenuJoinInput): number => Math.max(input.height, input.row.bottom - input.row.top);

const fromRowTop = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, viewHeight } = input;
  const height = rowHeight(input);
  return row.top >= 0 && row.top + height <= viewHeight - JOIN_MARGIN ? { align: 'top', top: row.top, height } : null;
};

const fromRowBottom = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, viewHeight } = input;
  const height = rowHeight(input);
  return row.bottom - height >= JOIN_MARGIN && row.bottom <= viewHeight ? { align: 'bottom', top: row.bottom - height, height } : null;
};

const onTheRow = (input: SubMenuJoinInput): JoinPlace => {
  const { row, height, lead, line, viewHeight } = input;
  const onScreen = Math.max(JOIN_MARGIN, Math.min(row.top - lead, viewHeight - JOIN_MARGIN - height));
  return { align: 'middle', top: Math.min(row.top - line, Math.max(onScreen, row.bottom + line - height)), height };
};

const joinPlace = (input: SubMenuJoinInput): JoinPlace => fromRowTop(input) ?? fromRowBottom(input) ?? onTheRow(input);

export { joinPlace };
