/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { SearchKeyContext } from './search-choice.type';

const searchEnterKey = (context: SearchKeyContext, event: KeyboardEvent): boolean => {
  const { model, open, typed, field } = context;
  if (event.key !== 'Enter') return false;
  const entry = open ? model.rows.entries[model.active.index] : undefined;
  if (entry !== undefined) {
    event.preventDefault();
    context.pick(entry.item.value);
    return true;
  }
  if (open || typed) {
    context.finish();
    return true;
  }
  event.preventDefault();
  field.setOpen(true);
  return true;
};

export { searchEnterKey };
