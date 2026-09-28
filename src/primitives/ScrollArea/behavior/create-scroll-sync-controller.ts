/* @layer renderer-components @kind logic */
import { createScrollGuard } from './create-scroll-guard';
import type { ScrollPosition } from '../ScrollArea.type';
import type { ScrollNode } from './create-scroll-sync-controller.type';

const createScrollSyncController = (getNode: () => ScrollNode | null) => {
  const guard = createScrollGuard();

  const applyScrollTo = (target: Partial<ScrollPosition>): void => {
    const node = getNode();
    if (!node) return;
    const nextTop = target.top ?? node.scrollTop;
    const nextLeft = target.left ?? node.scrollLeft;
    if (nextTop === node.scrollTop && nextLeft === node.scrollLeft) return;
    node.scrollTo({ top: nextTop, left: nextLeft, behavior: 'instant' });
    guard.markProgrammatic({ top: node.scrollTop, left: node.scrollLeft });
  };

  const handleScroll = (current: ScrollPosition, onScroll?: (position: ScrollPosition) => void): void => {
    if (guard.shouldSuppress(current)) return;
    onScroll?.(current);
  };

  return { applyScrollTo, handleScroll };
};

export { createScrollSyncController };
