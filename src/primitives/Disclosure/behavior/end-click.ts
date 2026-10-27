/* @layer renderer-components @kind logic */
import type { MouseEvent } from 'react';
import { END_CONTROL_SELECTOR } from './end-click.constants';

const endClick = (event: MouseEvent<HTMLElement>): void => {
  event.stopPropagation();
  const target = event.target as Partial<Element> | null;
  if (!target?.closest?.(END_CONTROL_SELECTOR)) event.preventDefault();
};

export { endClick };
