/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { ScrollAxis } from '../ScrollArea.type';
import { scrollFadeSides } from './scroll-fade-sides';

const useScrollFade = (nodeRef: RefObject<HTMLDivElement | null>, axis: ScrollAxis, enabled: boolean): void => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !enabled) return undefined;
    const update = (): void => {
      const sides = scrollFadeSides(node, axis);
      if (sides) node.dataset['fade'] = sides;
      else delete node.dataset['fade'];
    };
    const observer = new ResizeObserver(update);
    const watchChildren = (): void => {
      observer.observe(node);
      for (const child of Array.from(node.children)) observer.observe(child);
      update();
    };
    const mutations = new MutationObserver(watchChildren);
    mutations.observe(node, { childList: true });
    node.addEventListener('scroll', update, { passive: true });
    watchChildren();
    return () => {
      observer.disconnect();
      mutations.disconnect();
      node.removeEventListener('scroll', update);
      delete node.dataset['fade'];
    };
  }, [nodeRef, axis, enabled]);
};

export { useScrollFade };
