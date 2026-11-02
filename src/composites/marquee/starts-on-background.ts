/* @layer renderer-components @kind logic */
import { isElement } from '../../primitives/dom/is-element';
import { INTERACTIVE_SELECTOR } from './marquee.constants';
import type { PointerEvent as ReactPointerEvent } from 'react';

const startsOnBackground = (itemSelector: string | undefined) => (event: ReactPointerEvent<HTMLElement>): boolean => {
  if (!isElement(event.target)) return true;
  if (event.target.closest(INTERACTIVE_SELECTOR) !== null) return false;
  return itemSelector === undefined || event.target.closest(itemSelector) === null;
};

export { startsOnBackground };
