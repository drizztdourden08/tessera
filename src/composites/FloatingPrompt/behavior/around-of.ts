/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { PORTAL_ROOT_SELECTOR } from '../../DialogShell/DialogShell.constants';

const aroundOf = (layer: HTMLElement): HTMLElement[] => {
  const body = layer.ownerDocument.body;
  const around: HTMLElement[] = [];
  let node: HTMLElement = layer;
  while (node !== body && node.parentElement !== null) {
    const parent: HTMLElement = node.parentElement;
    const own = node;
    around.push(...[...parent.children].filter(isHTMLElement).filter((el) => el !== own && !el.inert && !el.matches(PORTAL_ROOT_SELECTOR)));
    node = parent;
  }
  return around;
};

export { aroundOf };
