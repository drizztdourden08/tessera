/* @layer renderer-components @kind hook */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { useInertSet } from './useInertSet';

const siblingsOf = (layer: HTMLElement): HTMLElement[] =>
  [...(layer.parentElement?.children ?? [])].filter(isHTMLElement).filter((el) => el !== layer && !el.inert);

const useInertSiblings = (layer: HTMLElement | null): void => {
  useInertSet(layer, siblingsOf);
};

export { useInertSiblings };
