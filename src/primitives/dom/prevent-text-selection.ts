/* @layer renderer-components @kind util */
import type { MouseEvent } from 'react';

const preventTextSelection = (event: MouseEvent): void => {
  event.preventDefault();
};

export { preventTextSelection };
