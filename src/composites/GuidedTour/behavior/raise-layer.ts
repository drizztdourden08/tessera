/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const raiseLayer = (layer: HTMLElement): void => {
  const focused = layer.ownerDocument.activeElement;
  const held = isHTMLElement(focused) && layer.contains(focused) ? focused : null;
  if (layer.matches(':popover-open')) layer.hidePopover();
  layer.showPopover();
  if (held && layer.ownerDocument.activeElement !== held) held.focus({ preventScroll: true });
};

export { raiseLayer };
