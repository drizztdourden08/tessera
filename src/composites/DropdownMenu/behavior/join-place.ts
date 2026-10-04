/* @layer renderer-components @kind util */
import { JOIN_MARGIN } from '../DropdownMenu.constants';
import type { JoinPlace, SubMenuJoinInput } from './sub-menu-join.type';

const bendOf = (input: SubMenuJoinInput): number => input.radius + input.gap / 2;

const fitsBelow = (input: SubMenuJoinInput, top: number, bottom: number): boolean => top >= 0 && bottom <= input.viewHeight - JOIN_MARGIN;

const fitsAbove = (input: SubMenuJoinInput, top: number, bottom: number): boolean => top >= JOIN_MARGIN && bottom <= input.viewHeight;

const fromTop = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, parent, height, line } = input;
  const reach = row.bottom + line;
  const grown = Math.max(height, reach - parent.top);
  if (parent.top + height < reach - bendOf(input) || !fitsBelow(input, parent.top, parent.top + grown)) return null;
  return { align: 'top', top: parent.top, height: grown };
};

const fromBottom = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, parent, height, line } = input;
  const reach = row.top - line;
  const grown = Math.max(height, parent.bottom - reach);
  if (parent.bottom - height > reach + bendOf(input) || !fitsAbove(input, parent.bottom - grown, parent.bottom)) return null;
  return { align: 'bottom', top: parent.bottom - grown, height: grown };
};

const fromRowTop = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, height } = input;
  const grown = Math.max(height, row.bottom - row.top);
  return fitsBelow(input, row.top, row.top + grown) ? { align: 'row-top', top: row.top, height: grown } : null;
};

const fromRowBottom = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, height } = input;
  const grown = Math.max(height, row.bottom - row.top);
  return fitsAbove(input, row.bottom - grown, row.bottom) ? { align: 'row-bottom', top: row.bottom - grown, height: grown } : null;
};

const onTheRow = (input: SubMenuJoinInput): JoinPlace => {
  const { row, height, lead, line, viewHeight } = input;
  const onScreen = Math.max(JOIN_MARGIN, Math.min(row.top - lead, viewHeight - JOIN_MARGIN - height));
  return { align: 'middle', top: Math.min(row.top - line, Math.max(onScreen, row.bottom + line - height)), height };
};

const joinPlace = (input: SubMenuJoinInput): JoinPlace =>
  fromTop(input) ?? fromBottom(input) ?? fromRowTop(input) ?? fromRowBottom(input) ?? onTheRow(input);

export { joinPlace };
