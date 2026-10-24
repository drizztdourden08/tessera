/* @layer renderer-components @kind util */
import type { MouseEvent } from 'react';
import { MIDDLE_BUTTON } from '../DocumentTabs.constants';

const middleClose = (close: () => void) => ({
  onMouseDown: (event: MouseEvent): void => {
    if (event.button === MIDDLE_BUTTON) event.preventDefault();
  },
  onAuxClick: (event: MouseEvent): void => {
    if (event.button !== MIDDLE_BUTTON) return;
    event.preventDefault();
    close();
  },
});

export { middleClose };
