/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { ChoiceKeyContext } from './choice-segment.type';

const choiceMoveKey = (context: ChoiceKeyContext, event: KeyboardEvent): boolean => {
  const { field, slot, index } = context;
  const empty = field.value[slot.name] == null;
  if (event.key === 'Backspace' && !empty) field.setSlot(slot.name, null);
  else if (event.key === 'Backspace' || event.key === 'ArrowLeft') field.moveTo(index - 1, 'end');
  else if (event.key === 'ArrowRight') field.moveTo(index + 1, 'all');
  else return false;
  event.preventDefault();
  return true;
};

export { choiceMoveKey };
