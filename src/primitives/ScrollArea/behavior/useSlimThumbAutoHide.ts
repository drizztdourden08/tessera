/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../dom/owner-window';
import { slimThumbIdleMs } from './slim-thumb-idle-ms';

const useSlimThumbAutoHide = (nodeRef: RefObject<HTMLDivElement | null>, enabled: boolean): void => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !enabled) return undefined;
    const view = ownerWindowOf(node);
    let timer: number | undefined;
    const rest = (): void => {
      delete node.dataset.scrolling;
      timer = undefined;
    };
    const onScroll = (): void => {
      node.dataset.scrolling = '';
      if (timer !== undefined) view.clearTimeout(timer);
      timer = view.setTimeout(rest, slimThumbIdleMs(node));
    };
    node.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      node.removeEventListener('scroll', onScroll);
      if (timer !== undefined) view.clearTimeout(timer);
      delete node.dataset.scrolling;
    };
  }, [nodeRef, enabled]);
};

export { useSlimThumbAutoHide };
