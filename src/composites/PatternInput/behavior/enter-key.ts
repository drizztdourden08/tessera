/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { TypedKeyContext } from './typed-segment.type';

const enterKey = (context: TypedKeyContext, event: KeyboardEvent<HTMLInputElement>): boolean => {
  const { field, slot, kind, draftRef, writeDraft } = context;
  if (event.key !== 'Enter') return false;
  const settled = kind.settle(draftRef.current ?? '', slot);
  if (settled !== undefined) field.setSlot(slot.name, settled);
  writeDraft(kind.edit(settled === undefined ? field.value[slot.name] : settled, slot), 'all');
  field.setOpen(false);
  return true;
};

export { enterKey };
