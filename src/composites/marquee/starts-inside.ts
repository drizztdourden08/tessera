/* @layer renderer-components @kind logic */
import { isElement } from '../../primitives/dom/is-element';

const startsInside = (container: Pick<HTMLElement, 'contains'>, target: EventTarget | null): boolean =>
  isElement(target) && container.contains(target);

export { startsInside };
