/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { rectOf } from './rect-of';
import type { KeyRect, KeyRects } from '../KeyboardLayout.type';

const measureKeys = (root: HTMLElement): KeyRects => {
  const rects = new Map<string, KeyRect>();
  root.querySelectorAll('[data-key-id]').forEach((node) => {
    if (isHTMLElement(node) && node.dataset.keyId) rects.set(node.dataset.keyId, rectOf(node));
  });
  return rects;
};

export { measureKeys };
