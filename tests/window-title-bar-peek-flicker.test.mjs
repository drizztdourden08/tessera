/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { titleBarClass } from '../src/composites/WindowTitleBar/behavior/title-bar-class';
import { usePeek } from '../src/composites/WindowTitleBar/behavior/usePeek';
import { PEEK_HIDE_MS } from '../src/composites/WindowTitleBar/WindowTitleBar.constants';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const ignore = () => undefined;
const html = (props) => renderToString(h(WindowTitleBar, { title: 'Brock', onControl: ignore, ...props }));

describe('a concealed title bar is an overlay, not a window handle', () => {
  it('drops its drag region while concealed or full screen', () => {
    expect(html({ concealed: true })).toContain('data-app-region="no-drag"');
    expect(html({ fullscreen: true })).toContain('data-app-region="no-drag"');
  });

  it('keeps the drag region while it is shown', () => {
    expect(html({})).toContain('data-app-region="drag"');
  });
});

describe('a bar with an open menu stays where it is', () => {
  it('keeps the concealed class and adds the peek class, so the page does not jump', () => {
    const open = titleBarClass(true, true, '');
    expect(open).toContain('window-title-bar--concealed');
    expect(open).toContain('window-title-bar--peek');
  });

  it('tucks on concealed or fullscreen alone, and forces the bar shown while a menu is open', () => {
    const source = readFileSync(new URL('../src/composites/WindowTitleBar/WindowTitleBar.tsx', import.meta.url), 'utf8');
    expect(source).toContain('const away = concealed || fullscreen;');
    expect(source).not.toMatch(/&& !menus\.anyOpen/);
    expect(source).toContain('|| menus.anyOpen');
  });
});

const setup = (menuOpen = false) => {
  const listeners = {};
  const view = {
    addEventListener: (type, listener) => { listeners[type] = listener; },
    removeEventListener: (type) => { delete listeners[type]; },
  };
  const bar = {
    ownerDocument: { defaultView: view },
    parentElement: { getBoundingClientRect: () => ({ top: 0 }) },
    contains: (node) => node === bar,
  };
  const ref = { current: bar };
  const peek = mountHook(() => usePeek(true, ref, true, menuOpen));
  const move = (target, clientY) => peek.act(() => listeners.mousemove({ target, clientY }));
  return { peek, bar, move, handlers: () => peek.current.handlers, listeners, ref };
};

const FAR = 400;
const ZONE = 10;
const outside = {};

const reveal = (rig) => {
  rig.move(outside, ZONE);
  rig.peek.act(() => rig.handlers().onMouseEnter());
  expect(rig.peek.current.peeking).toBe(true);
};

describe('the peek hides after a delay, not at once', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('waits PEEK_HIDE_MS after the pointer leaves the bar', () => {
    const rig = setup();
    reveal(rig);
    rig.peek.act(() => rig.handlers().onMouseLeave());
    expect(rig.peek.current.peeking).toBe(true);
    vi.advanceTimersByTime(PEEK_HIDE_MS - 1);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(true);
    vi.advanceTimersByTime(1);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(false);
  });

  it('waits the same delay when the pointer moves out of the zone', () => {
    const rig = setup();
    reveal(rig);
    rig.move(outside, FAR);
    expect(rig.peek.current.peeking).toBe(true);
    vi.advanceTimersByTime(PEEK_HIDE_MS);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(false);
  });

  it('does not restart the timer on every move outside', () => {
    const rig = setup();
    reveal(rig);
    rig.move(outside, FAR);
    vi.advanceTimersByTime(PEEK_HIDE_MS - 100);
    rig.move(outside, FAR + 1);
    vi.advanceTimersByTime(100);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(false);
  });
});

describe('the peek hide delay is cancelled', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('cancels on mouseenter', () => {
    const rig = setup();
    reveal(rig);
    rig.peek.act(() => rig.handlers().onMouseLeave());
    vi.advanceTimersByTime(PEEK_HIDE_MS / 2);
    rig.peek.act(() => rig.handlers().onMouseEnter());
    vi.advanceTimersByTime(PEEK_HIDE_MS * 2);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(true);
  });

  it('cancels on a move inside the bar', () => {
    const rig = setup();
    reveal(rig);
    rig.peek.act(() => rig.handlers().onMouseLeave());
    rig.move(rig.bar, FAR);
    vi.advanceTimersByTime(PEEK_HIDE_MS * 2);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(true);
  });

  it('cancels on a move inside the zone', () => {
    const rig = setup();
    reveal(rig);
    rig.peek.act(() => rig.handlers().onMouseLeave());
    rig.move(outside, ZONE);
    vi.advanceTimersByTime(PEEK_HIDE_MS * 2);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(true);
  });

  it('clears the timer on unmount', () => {
    const rig = setup();
    reveal(rig);
    rig.peek.act(() => rig.handlers().onMouseLeave());
    expect(vi.getTimerCount()).toBe(1);
    rig.peek.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('the peek and its open menus', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const withMenu = () => {
    const rig = setup();
    rig.move(outside, ZONE);
    rig.peek.act(() => rig.handlers().onMouseEnter());
    rig.peek.rerender(() => usePeek(true, rig.ref, true, true));
    return rig;
  };

  it('starts no timer while a menu is open, even when the pointer leaves the bar', () => {
    const rig = withMenu();
    rig.peek.act(() => rig.handlers().onMouseLeave());
    rig.move(outside, FAR);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(PEEK_HIDE_MS * 2);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(true);
  });

  it('starts the timer when the menu closes with the pointer outside the bar', () => {
    const rig = withMenu();
    rig.peek.act(() => rig.handlers().onMouseLeave());
    rig.peek.rerender(() => usePeek(true, rig.ref, true, false));
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(PEEK_HIDE_MS);
    rig.peek.act(() => undefined);
    expect(rig.peek.current.peeking).toBe(false);
  });

  it('starts no timer when the menu closes with the pointer on the bar', () => {
    const rig = withMenu();
    rig.peek.rerender(() => usePeek(true, rig.ref, true, false));
    expect(vi.getTimerCount()).toBe(0);
    expect(rig.peek.current.peeking).toBe(true);
  });

  it('keeps Alt reveal and Escape off while a menu is open, as before', () => {
    const rig = withMenu();
    const escape = { key: 'Escape', defaultPrevented: false, target: null, preventDefault: vi.fn() };
    rig.handlers().onKeyDown(escape);
    expect(escape.preventDefault).not.toHaveBeenCalled();
  });
});
