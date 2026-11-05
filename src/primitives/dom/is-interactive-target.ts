/* @layer renderer-components @kind util */
import { ELEMENT_NODE, INTERACTIVE_TARGET } from './interactive-target.constants';

const asElement = (target: EventTarget | null): Element | null =>
  target !== null && (target as Node).nodeType === ELEMENT_NODE ? (target as Element) : null;

const isInteractiveTarget = (target: EventTarget | null, boundary?: Element): boolean => {
  const element = asElement(target);
  if (element === null) return false;
  const found = element.closest(INTERACTIVE_TARGET);
  if (found === null) return false;
  return boundary === undefined || (found !== boundary && boundary.contains(found));
};

export { isInteractiveTarget };
