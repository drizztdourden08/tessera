/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { ScrollAxis } from '../ScrollArea.type';
import { scrollFadeSides } from './scroll-fade-sides';
import { scrollOverflowAxes } from './scroll-overflow-axes';

const setData = (node: HTMLElement, key: 'fade' | 'overflow', value: string): void => {
  if (value) node.dataset[key] = value;
  else delete node.dataset[key];
};

const useScrollEdges = (nodeRef: RefObject<HTMLDivElement | null>, axis: ScrollAxis, fade: boolean): void => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;
    const update = (): void => {
      setData(node, 'overflow', scrollOverflowAxes(node, axis));
      setData(node, 'fade', fade ? scrollFadeSides(node, axis) : '');
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
      setData(node, 'overflow', '');
      setData(node, 'fade', '');
    };
  }, [nodeRef, axis, fade]);
};

export { useScrollEdges };
