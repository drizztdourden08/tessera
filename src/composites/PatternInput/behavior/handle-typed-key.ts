/* @layer renderer-components @kind util */
import { edgeKey } from './edge-key';
import { enterKey } from './enter-key';
import { separatorKey } from './separator-key';
import { stepKey } from './step-key';
import type { KeyboardEvent } from 'react';
import type { TypedKeyContext } from './typed-segment.type';

const handleTypedKey = (context: TypedKeyContext, event: KeyboardEvent<HTMLInputElement>): void => {
  if (event.key === 'Tab' && !event.shiftKey) {
    context.field.closeNow();
    return;
  }
  if (stepKey(context, event) || enterKey(context, event) || edgeKey(context, event)) return;
  separatorKey(context, event);
};

export { handleTypedKey };
