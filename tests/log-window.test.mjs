/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { appendedSince } from '../src/composites/LogPanel/behavior/appended-since';
import { useLogWindow } from '../src/composites/LogPanel/behavior/useLogWindow';
import { CHUNK } from '../src/composites/LogPanel/behavior/useLogWindow.constants';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const row = (i) => ({ id: `r${i}`, gutter: '', tag: 'ITEM', kind: 'item', message: `line ${i}` });
const rowsUpTo = (count, from = 0) => Array.from({ length: count }, (_, i) => row(from + i));

const mountLog = (start) => {
  let rows = start;
  const log = mountHook(() => useLogWindow(rows));
  const show = (next) => {
    rows = next;
    log.rerender(() => useLogWindow(rows));
  };
  const scroll = (scrollTop) => {
    log.current.scrollRef.current = { scrollHeight: 10000, clientHeight: 300, scrollTop, scrollTo: () => {} };
    log.act((win) => win.handleScroll());
  };
  return { log, show, scroll, rows: () => rows };
};

const shown = ({ log }) => [log.current.shownCount, log.current.hiddenOlder];

const filterThenClear = (view) => {
  view.show([row(5), row(9)]);
  expect(shown(view)).toEqual([2, 0]);
  view.show(rowsUpTo(1000));
  expect(shown(view)).toEqual([CHUNK, 1000 - CHUNK]);
};

describe('LogPanel window, pinned to the newest rows', () => {
  it('grows with a log that starts empty and receives rows one at a time', () => {
    const view = mountLog([]);
    expect(shown(view)).toEqual([0, 0]);
    for (let n = 1; n <= CHUNK; n += 1) {
      view.show(rowsUpTo(n));
      expect(shown(view)).toEqual([n, 0]);
    }
    view.show(rowsUpTo(CHUNK + 1));
    expect(shown(view)).toEqual([CHUNK, 1]);
    view.show(rowsUpTo(CHUNK + 7));
    expect(shown(view)).toEqual([CHUNK, 7]);
  });

  it('grows from fewer than CHUNK rows past CHUNK, then keeps the newest CHUNK', () => {
    const view = mountLog(rowsUpTo(3));
    expect(shown(view)).toEqual([3, 0]);
    view.show(rowsUpTo(CHUNK - 1));
    expect(shown(view)).toEqual([CHUNK - 1, 0]);
    view.show(rowsUpTo(CHUNK + 250));
    expect(shown(view)).toEqual([CHUNK, 250]);
  });

  it('shows the newest CHUNK again once a narrowed filter is cleared', () => {
    filterThenClear(mountLog(rowsUpTo(1000)));
  });
});

describe('LogPanel window, Load older', () => {
  it('mounts CHUNK more older rows each time, up to the whole log', () => {
    const view = mountLog(rowsUpTo(1000));
    expect(shown(view)).toEqual([CHUNK, 600]);
    view.log.act((win) => win.loadOlder());
    expect(shown(view)).toEqual([2 * CHUNK, 200]);
    view.log.act((win) => win.loadOlder());
    expect(shown(view)).toEqual([1000, 0]);
  });
});

describe('LogPanel window, scrolled away from the newest rows', () => {
  it('keeps the loaded older rows and adds new rows below them', () => {
    const view = mountLog(rowsUpTo(1000));
    view.log.act((win) => win.loadOlder());
    view.scroll(0);
    expect(view.log.current.pinned).toBe(false);
    view.show(rowsUpTo(1005));
    expect(shown(view)).toEqual([2 * CHUNK + 5, 200]);
    expect(view.log.current.scrollRef.current.scrollTop).toBe(0);
  });

  it('keeps every row of a short log, and the rows the reader sees once it passes CHUNK', () => {
    const view = mountLog(rowsUpTo(5));
    view.scroll(0);
    view.show(rowsUpTo(CHUNK));
    expect(shown(view)).toEqual([CHUNK, 0]);
    view.show(rowsUpTo(CHUNK + 30));
    expect(shown(view)).toEqual([CHUNK + 30, 0]);
  });

  it('shows the newest CHUNK when a filter replaces the rows', () => {
    const view = mountLog(rowsUpTo(1000));
    view.scroll(0);
    filterThenClear(view);
  });

  it('goes back to the newest CHUNK once the reader returns to the end and a row arrives', () => {
    const view = mountLog(rowsUpTo(1000));
    view.log.act((win) => win.loadOlder());
    view.scroll(0);
    view.scroll(10000 - 300);
    expect(view.log.current.pinned).toBe(true);
    view.show(rowsUpTo(1001));
    expect(shown(view)).toEqual([CHUNK, 1001 - CHUNK]);
  });
});

describe('appendedSince', () => {
  it('counts rows added at the end, and at the end of a log that drops its oldest rows', () => {
    expect(appendedSince(rowsUpTo(12), 'r9', 10)).toBe(2);
    expect(appendedSince(rowsUpTo(10, 2), 'r9', 10)).toBe(2);
    expect(appendedSince(rowsUpTo(3), undefined, 0)).toBe(3);
  });

  it('is null when the rows were replaced', () => {
    expect(appendedSince(rowsUpTo(1000), 'r9', 2)).toBeNull();
    expect(appendedSince(rowsUpTo(4, 50), 'r9', 10)).toBeNull();
    expect(appendedSince(rowsUpTo(4), undefined, 6)).toBeNull();
  });
});
