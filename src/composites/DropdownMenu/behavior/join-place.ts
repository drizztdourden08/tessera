/* @layer renderer-components @kind util */
import { JOIN_MARGIN } from '../DropdownMenu.constants';
import type { JoinPlace, SubMenuJoinInput } from './sub-menu-join.type';

const bendOf = (input: SubMenuJoinInput): number => input.radius + input.gap / 2;

const fromTop = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, parent, height, line, viewHeight } = input;
  const reach = row.bottom + line;
  const bottom = Math.max(parent.top + height, reach);
  if (parent.top + height < reach - bendOf(input) || bottom > viewHeight - JOIN_MARGIN) return null;
  return { top: parent.top, height: bottom - parent.top };
};

const fromBottom = (input: SubMenuJoinInput): JoinPlace | null => {
  const { row, parent, height, line } = input;
  const reach = row.top - line;
  const top = Math.min(parent.bottom - height, reach);
  if (parent.bottom - height > reach + bendOf(input) || top < JOIN_MARGIN) return null;
  return { top, height: parent.bottom - top };
};

const onTheRow = (input: SubMenuJoinInput): JoinPlace => {
  const { row, height, lead, line, viewHeight } = input;
  const onScreen = Math.max(JOIN_MARGIN, Math.min(row.top - lead, viewHeight - JOIN_MARGIN - height));
  return { top: Math.min(row.top - line, Math.max(onScreen, row.bottom + line - height)), height };
};

const joinPlace = (input: SubMenuJoinInput): JoinPlace => fromTop(input) ?? fromBottom(input) ?? onTheRow(input);

export { joinPlace };
