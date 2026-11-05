/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';

const pressKeys = (onPress: () => void) => (event: KeyboardEvent<HTMLElement>) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  onPress();
};

export { pressKeys };
