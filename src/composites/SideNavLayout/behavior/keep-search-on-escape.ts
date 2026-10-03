/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';

const keepSearchOnEscape = (query: string) => (event: KeyboardEvent<HTMLElement>): void => {
  if (event.key === 'Escape' && query !== '') event.stopPropagation();
};

export { keepSearchOnEscape };
