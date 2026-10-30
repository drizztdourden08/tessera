/* @layer renderer-components @kind logic */
import { isElement } from '../../primitives/dom/is-element';
import { POPUP_SELECTOR } from './marquee.constants';

const startsInside = (container: Pick<HTMLElement, 'contains'>, target: EventTarget | null): boolean =>
  isElement(target) && container.contains(target) && target.closest(POPUP_SELECTOR) === null;

export { startsInside };
