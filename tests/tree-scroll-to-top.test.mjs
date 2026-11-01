/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { scrollToTop } from '../src/composites/Tree/behavior/scroll-to-top';

describe('K1 Tree scrollToTop', { tags: ['critical'] }, () => {
  it('sets the scroll position to zero and refreshes the drawn rows', () => {
    const root = { scrollTop: 480 };
    const onScroll = vi.fn();
    scrollToTop(root, onScroll);
    expect(root.scrollTop).toBe(0);
    expect(onScroll).toHaveBeenCalledOnce();
  });

  it('does nothing before the tree is mounted', () => {
    const onScroll = vi.fn();
    scrollToTop(null, onScroll);
    expect(onScroll).not.toHaveBeenCalled();
  });
});
