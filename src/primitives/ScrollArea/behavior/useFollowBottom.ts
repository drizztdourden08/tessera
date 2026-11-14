/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../dom/observe-resize';
import { FOLLOW_SLACK_PX } from '../ScrollArea.constants';
import { isAtBottom } from './is-at-bottom';

const useFollowBottom = (nodeRef: RefObject<HTMLDivElement | null>, follow: boolean): void => {
  useEffect(() => {
    const node = nodeRef.current;
    if (!follow || !node) return undefined;
    let pinned = true;
    const stick = (): void => {
      if (pinned) node.scrollTop = node.scrollHeight;
    };
    const onScroll = (): void => {
      pinned = isAtBottom(node, FOLLOW_SLACK_PX);
    };
    let stopResize = (): void => undefined;
    const watch = (): void => {
      stopResize();
      stopResize = observeResize([node, ...node.children], stick);
      stick();
    };
    const mutations = new MutationObserver(watch);
    mutations.observe(node, { childList: true, subtree: true });
    node.addEventListener('scroll', onScroll, { passive: true });
    watch();
    return () => {
      stopResize();
      mutations.disconnect();
      node.removeEventListener('scroll', onScroll);
    };
  }, [nodeRef, follow]);
};

export { useFollowBottom };
