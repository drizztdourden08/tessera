/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { MenuFocusStart } from './menu-context.type';

const triggerKeys = (open: boolean, openAt: (from: MenuFocusStart) => void) => (event: KeyboardEvent<HTMLButtonElement>): void => {
  if (open || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;
  event.preventDefault();
  openAt(event.key === 'ArrowDown' ? 'first' : 'last');
};

export { triggerKeys };
