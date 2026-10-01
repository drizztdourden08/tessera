/* @layer renderer-components @kind util */
import { choiceMoveKey } from './choice-move-key';
import { choiceNavKey } from './choice-nav-key';
import { choicePickKey } from './choice-pick-key';
import { choiceTypeKey } from './choice-type-key';
import type { KeyboardEvent } from 'react';
import type { ChoiceKeyContext } from './choice-segment.type';

const handleChoiceKey = (context: ChoiceKeyContext, event: KeyboardEvent): void => {
  if (event.key === 'Tab' && !event.shiftKey) {
    context.field.closeNow();
    return;
  }
  if (choiceNavKey(context, event) || choicePickKey(context, event) || choiceMoveKey(context, event)) return;
  choiceTypeKey(context, event);
};

export { handleChoiceKey };
