/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { followScrollTop } from '../src/composites/LogPanel/behavior/follow-scroll-top';
import { isAtBottom } from '../src/composites/LogPanel/behavior/is-at-bottom';
import { isAtFollowEdge } from '../src/composites/LogPanel/behavior/is-at-follow-edge';
import { isFollowing } from '../src/composites/LogPanel/behavior/is-following';
import { shownRows } from '../src/composites/LogPanel/behavior/shown-rows';
import { useLogWindow } from '../src/composites/LogPanel/behavior/useLogWindow';
import { BOTTOM_SLACK } from '../src/composites/LogPanel/behavior/useLogWindow.constants';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const rowsUpTo = (count) => Array.from({ length: count }, (_, i) => ({ id: `line-${i}`, gutter: '', tag: 'LOG', kind: 'out', message: `text ${i}` }));

describe('isAtBottom', () => {
  it('is true at the end and within the slack of it', () => {
    expect(isAtBottom({ scrollHeight: 1000, scrollTop: 700, clientHeight: 300 }, BOTTOM_SLACK)).toBe(true);
    expect(isAtBottom({ scrollHeight: 1000, scrollTop: 700 - BOTTOM_SLACK, clientHeight: 300 }, BOTTOM_SLACK)).toBe(true);
  });

  it('is false once the reader is further up than the slack', () => {
    expect(isAtBottom({ scrollHeight: 1000, scrollTop: 699 - BOTTOM_SLACK, clientHeight: 300 }, BOTTOM_SLACK)).toBe(false);
    expect(isAtBottom({ scrollHeight: 1000, scrollTop: 0, clientHeight: 300 }, BOTTOM_SLACK)).toBe(false);
  });

  it('is true for a log shorter than its box', () => {
    expect(isAtBottom({ scrollHeight: 100, scrollTop: 0, clientHeight: 300 }, 0)).toBe(true);
  });
});

describe('isFollowing', () => {
  it('follows only when asked to and at the bottom', () => {
    expect(isFollowing(true, true)).toBe(true);
    expect(isFollowing(true, false)).toBe(false);
    expect(isFollowing(false, true)).toBe(false);
    expect(isFollowing(false, false)).toBe(false);
  });
});

const mountTerminal = (start, follow = true, order = 'oldest-first') => {
  let rows = start;
  let on = follow;
  const log = mountHook(() => useLogWindow(rows, on, order));
  const el = { scrollHeight: 10000, clientHeight: 300, scrollTop: 0, scrollTo: vi.fn() };
  log.current.scrollRef.current = el;
  const scrollTo = (top) => {
    el.scrollTop = top;
    log.act((win) => win.handleScroll());
  };
  const add = (count) => {
    rows = rowsUpTo(rows.length + count);
    log.rerender(() => useLogWindow(rows, on, order));
  };
  const setFollow = (next) => {
    on = next;
    log.rerender(() => useLogWindow(rows, on, order));
  };
  return { log, el, scrollTo, add, setFollow };
};

describe('stick to the bottom', () => {
  it('keeps the view at the bottom while lines arrive', () => {
    const view = mountTerminal(rowsUpTo(50));
    view.scrollTo(9700);
    view.add(1);
    expect(view.el.scrollTop).toBe(view.el.scrollHeight);
    expect(view.log.current.pinned).toBe(true);
  });

  it('stops following once the reader scrolls up, and shows the jump button state', () => {
    const view = mountTerminal(rowsUpTo(50));
    view.scrollTo(9700);
    view.scrollTo(2000);
    expect(view.log.current.pinned).toBe(false);
    view.add(3);
    expect(view.el.scrollTop).toBe(2000);
  });

  it('jumps to the bottom and follows again', () => {
    const view = mountTerminal(rowsUpTo(50));
    view.scrollTo(2000);
    view.log.act((win) => win.jumpToNewest());
    expect(view.el.scrollTo).toHaveBeenCalledWith({ top: 10000, behavior: 'instant' });
    expect(view.log.current.pinned).toBe(true);
    view.add(1);
    expect(view.el.scrollTop).toBe(view.el.scrollHeight);
  });

  it('does not move the view when follow is off, even at the bottom', () => {
    const view = mountTerminal(rowsUpTo(50), false);
    view.scrollTo(9700);
    view.el.scrollTop = 9700;
    view.add(2);
    expect(view.el.scrollTop).toBe(9700);
  });

  it('follows again when follow is turned back on', () => {
    const view = mountTerminal(rowsUpTo(50), false);
    view.scrollTo(9700);
    view.setFollow(true);
    expect(view.el.scrollTop).toBe(view.el.scrollHeight);
  });
});

const idsOf = (rows) => rows.map((row) => row.id);

describe('shownRows', () => {
  it('keeps the oldest first order and the newest lines of the window', () => {
    expect(idsOf(shownRows(rowsUpTo(5), 3, 'oldest-first'))).toEqual(['line-2', 'line-3', 'line-4']);
  });

  it('puts the newest line at the top and keeps the same window', () => {
    expect(idsOf(shownRows(rowsUpTo(5), 3, 'newest-first'))).toEqual(['line-4', 'line-3', 'line-2']);
    expect(idsOf(shownRows(rowsUpTo(2), 400, 'newest-first'))).toEqual(['line-1', 'line-0']);
  });

  it('leaves the rows it was given untouched', () => {
    const rows = rowsUpTo(4);
    shownRows(rows, 4, 'newest-first');
    expect(idsOf(rows)).toEqual(['line-0', 'line-1', 'line-2', 'line-3']);
  });
});

describe('isAtFollowEdge', () => {
  it('is the top in newest-first, within the slack', () => {
    expect(isAtFollowEdge({ scrollHeight: 1000, scrollTop: 0, clientHeight: 300 }, BOTTOM_SLACK, 'newest-first')).toBe(true);
    expect(isAtFollowEdge({ scrollHeight: 1000, scrollTop: BOTTOM_SLACK, clientHeight: 300 }, BOTTOM_SLACK, 'newest-first')).toBe(true);
    expect(isAtFollowEdge({ scrollHeight: 1000, scrollTop: BOTTOM_SLACK + 1, clientHeight: 300 }, BOTTOM_SLACK, 'newest-first')).toBe(false);
    expect(isAtFollowEdge({ scrollHeight: 1000, scrollTop: 700, clientHeight: 300 }, BOTTOM_SLACK, 'newest-first')).toBe(false);
  });

  it('is still the bottom in oldest-first', () => {
    expect(isAtFollowEdge({ scrollHeight: 1000, scrollTop: 700, clientHeight: 300 }, BOTTOM_SLACK, 'oldest-first')).toBe(true);
    expect(isAtFollowEdge({ scrollHeight: 1000, scrollTop: 0, clientHeight: 300 }, BOTTOM_SLACK, 'oldest-first')).toBe(false);
  });
});

describe('followScrollTop', () => {
  it('follows to the top in newest-first and to the end in oldest-first', () => {
    const box = { scrollHeight: 1000, scrollTop: 400, clientHeight: 300 };
    expect(followScrollTop(box, 'newest-first')).toBe(0);
    expect(followScrollTop(box, 'oldest-first')).toBe(1000);
  });
});

describe('stick to the top in newest-first', () => {
  it('keeps the view at the top while lines arrive', () => {
    const view = mountTerminal(rowsUpTo(50), true, 'newest-first');
    view.scrollTo(20);
    view.add(1);
    expect(view.el.scrollTop).toBe(0);
    expect(view.log.current.pinned).toBe(true);
  });

  it('stops following once the reader scrolls down', () => {
    const view = mountTerminal(rowsUpTo(50), true, 'newest-first');
    view.scrollTo(3000);
    expect(view.log.current.pinned).toBe(false);
    view.add(2);
    expect(view.el.scrollTop).toBe(3000);
    expect(view.log.current.hiddenOlder).toBe(0);
  });

  it('jumps to the top and follows again', () => {
    const view = mountTerminal(rowsUpTo(50), true, 'newest-first');
    view.scrollTo(2000);
    view.log.act((win) => win.jumpToNewest());
    expect(view.el.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
    expect(view.log.current.pinned).toBe(true);
    view.el.scrollTop = 500;
    view.add(1);
    expect(view.el.scrollTop).toBe(0);
  });

  it('keeps the window: only the newest 400 are shown and the rest are hidden older', () => {
    const view = mountTerminal(rowsUpTo(1500), true, 'newest-first');
    expect(view.log.current.shownCount).toBe(400);
    expect(view.log.current.hiddenOlder).toBe(1100);
    view.log.act((win) => win.loadOlder());
    expect(view.log.current.shownCount).toBe(800);
  });
});
