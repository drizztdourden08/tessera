/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import type { CommandKeyEvent } from '../CommandInput.type';

const keyPress = (event: KeyboardEvent<HTMLInputElement>): CommandKeyEvent => {
  const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
  return { key, altKey, ctrlKey, metaKey, shiftKey, isComposing: event.nativeEvent.isComposing };
};

export { keyPress };
