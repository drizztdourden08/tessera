/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const useInertSiblings = (layer: HTMLElement | null): void => {
  useLayoutEffect(() => {
    const parent = layer?.parentElement;
    if (!layer || !parent) return undefined;
    const made = [...parent.children].filter(isHTMLElement).filter((el) => el !== layer && !el.inert);
    made.forEach((el) => { el.inert = true; });
    return () => made.forEach((el) => { el.inert = false; });
  }, [layer]);
};

export { useInertSiblings };
