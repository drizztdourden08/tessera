/* @layer renderer-components @kind util */
import { STEP_KEYS, STEPPED_TYPES } from './typed-keys.constants';
import type { KeyboardEvent } from 'react';
import type { TypedKeyContext } from './typed-segment.type';

const stepKey = (context: TypedKeyContext, event: KeyboardEvent<HTMLInputElement>): boolean => {
  const { field, slot, kind, draftRef, writeDraft } = context;
  const by = STEP_KEYS[event.key];
  if (by === undefined || !STEPPED_TYPES.has(slot.type)) return false;
  event.preventDefault();
  const typed = kind.read(draftRef.current ?? '', slot);
  const next = kind.step(typed ?? field.value[slot.name], slot, by);
  if (next === undefined) return true;
  field.setSlot(slot.name, next);
  writeDraft(kind.edit(next, slot), 'all');
  field.setOpen(true);
  return true;
};

export { stepKey };
