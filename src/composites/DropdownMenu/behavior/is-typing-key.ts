/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const isTypingKey = (event: KeyboardEvent<HTMLElement>): boolean =>
  !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== ' ' && (event.key.length === 1 || event.key === 'Backspace');

export { isTypingKey };
