/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const opensElsewhere = (event: Event, layer: HTMLElement): boolean => {
  if (!('newState' in event) || event.newState !== 'open') return false;
  const target = event.target;
  return isHTMLElement(target) && target.hasAttribute('popover') && !layer.contains(target);
};

export { opensElsewhere };
