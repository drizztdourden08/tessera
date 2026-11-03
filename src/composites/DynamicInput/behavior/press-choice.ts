/* @layer renderer-components @kind util */
import { MAIN_BUTTON } from './choice.constants';
import type { MouseEvent } from 'react';
import type { ChoicePress } from './choice-segment.type';

const pressChoice = (press: ChoicePress, event: MouseEvent): void => {
  const { field, index, open } = press;
  if (event.button !== MAIN_BUTTON || field.disabled) return;
  event.preventDefault();
  if (field.focus.index === index) field.setOpen(!open);
  else field.moveTo(index, 'all');
};

export { pressChoice };
