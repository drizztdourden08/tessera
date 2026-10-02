/* @layer renderer-components @kind util */
import { PICK_KEYS } from './choice-keys.constants';
import type { KeyboardEvent } from 'react';
import type { ChoiceKeyContext } from './choice-segment.type';

const choicePickKey = (context: ChoiceKeyContext, event: KeyboardEvent): boolean => {
  const { model, open, field, pick } = context;
  if (!PICK_KEYS.has(event.key)) return false;
  event.preventDefault();
  const entry = model.rows.entries[model.active.index];
  if (open && entry !== undefined) pick(entry.item.value);
  else field.setOpen(true);
  return true;
};

export { choicePickKey };
