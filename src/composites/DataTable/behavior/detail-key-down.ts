/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';

const detailKeyDown = (onClose: (() => void) | undefined) => {
  if (!onClose) return undefined;
  return (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key !== 'Escape' || event.defaultPrevented) return;
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };
};

export { detailKeyDown };
