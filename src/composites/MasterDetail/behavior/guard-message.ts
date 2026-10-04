/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { MasterDetailList, MasterDetailMove } from '../MasterDetail.type';

const nameOf = <T,>(list: MasterDetailList<T>, id: string | null): string => {
  const item = id === null ? undefined : list.items.find((entry) => list.getId(entry) === id);
  return item === undefined ? '' : list.getName(item);
};

const guardMessage = <T,>(strings: TesseraStrings, list: MasterDetailList<T>, selectedId: string | null, move: MasterDetailMove | null) => {
  const { lists } = strings;
  const current = nameOf(list, selectedId);
  if (move?.kind === 'select') return { message: lists.unsavedOpen(current, nameOf(list, move.id)), saveLabel: lists.saveAndOpen };
  return { message: lists.unsavedLeave(current), saveLabel: lists.saveAndLeave };
};

export { guardMessage };
