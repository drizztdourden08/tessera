/* @layer renderer-components @kind util */
import { choiceNavKey } from './choice-nav-key';
import { edgeKey } from './edge-key';
import { searchEnterKey } from './search-enter-key';
import type { KeyboardEvent } from 'react';
import type { SearchKeyContext } from './search-choice.type';

const searchChoiceKey = (context: SearchKeyContext, event: KeyboardEvent<HTMLInputElement>): void => {
  if (event.key === 'Tab' && !event.shiftKey) {
    context.field.closeNow();
    return;
  }
  if (choiceNavKey(context, event, false) || searchEnterKey(context, event)) return;
  edgeKey(context, event);
};

export { searchChoiceKey };
