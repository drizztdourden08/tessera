/* @layer renderer-components @kind logic */
import { isElement } from '../../primitives/dom/is-element';
import type { PointerEvent as ReactPointerEvent } from 'react';

const startsOnBackground = (itemSelector: string | undefined) => (event: ReactPointerEvent<HTMLElement>): boolean => {
  if (itemSelector === undefined) return true;
  return !isElement(event.target) || event.target.closest(itemSelector) === null;
};

export { startsOnBackground };
