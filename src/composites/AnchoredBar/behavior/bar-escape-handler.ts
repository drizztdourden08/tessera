/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import { BAR_ESCAPE_KEY } from '../AnchoredBar.constants';

const barEscapeHandler = (onEscape: (() => void) | undefined) => (event: KeyboardEvent<HTMLElement>): void => {
  if (event.key !== BAR_ESCAPE_KEY || !onEscape) return;
  event.stopPropagation();
  onEscape();
};

export { barEscapeHandler };
