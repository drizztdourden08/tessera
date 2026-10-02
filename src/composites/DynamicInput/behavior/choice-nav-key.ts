/* @layer renderer-components @kind util */
import { navTarget } from '../../../primitives/listbox/nav-target';
import type { KeyboardEvent } from 'react';
import type { ChoiceKeyContext } from './choice-segment.type';

const choiceNavKey = (context: ChoiceKeyContext, event: KeyboardEvent): boolean => {
  const target = navTarget(event.key, true);
  if (target === undefined) return false;
  event.preventDefault();
  if (context.open) context.model.active.move(target);
  else context.field.setOpen(true);
  return true;
};

export { choiceNavKey };
