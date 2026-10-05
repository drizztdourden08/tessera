/* @layer renderer-components @kind logic */
import type { MouseEvent } from 'react';

const blockDoubleClickSelect = (event: MouseEvent<HTMLElement>) => {
  if (event.detail > 1) event.preventDefault();
};

export { blockDoubleClickSelect };
