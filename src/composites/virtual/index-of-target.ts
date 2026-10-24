/* @layer renderer-components @kind logic */
import { isElement } from '../../primitives/dom/is-element';

const indexOfTarget = (target: EventTarget, attribute: string): number => {
  const holder = isElement(target) ? target.closest(`[${attribute}]`) : null;
  return holder === null ? -1 : Number(holder.getAttribute(attribute));
};

export { indexOfTarget };
