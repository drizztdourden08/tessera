/* @layer renderer-components @kind logic */
import type { ThumbInsets } from './slim-thumb.type';

const pixels = (style: CSSStyleDeclaration, name: string): number => {
  const value = Number.parseFloat(style.getPropertyValue(name));
  return Number.isFinite(value) ? value : 0;
};

const slimThumbInsets = (node: HTMLElement): ThumbInsets => {
  const style = getComputedStyle(node);
  return {
    edge: pixels(style, '--scroll-thumb-edge'),
    ends: pixels(style, '--scroll-thumb-ends'),
    min: pixels(style, '--scroll-thumb-min'),
  };
};

export { slimThumbInsets };
