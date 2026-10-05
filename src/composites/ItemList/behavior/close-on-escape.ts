/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const closeOnEscape = (event: KeyboardEvent<HTMLElement>, close: () => void): void => {
  if (event.key !== 'Escape' || event.defaultPrevented) return;
  event.preventDefault();
  event.stopPropagation();
  close();
};

export { closeOnEscape };
