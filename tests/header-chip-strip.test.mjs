/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { mountHook } from './hook-harness.mjs';
import { HeaderAnchorNav } from '../src/composites/HeaderAnchorNav';
import { stackOf } from '../src/composites/ScreenPage/behavior/stack-of';
import { Tabs } from '../src/primitives/Tabs';
import { stripLeastWidth } from '../src/primitives/scroll-strip/strip-least-width';
import { useScrollStrip } from '../src/primitives/scroll-strip/useScrollStrip';
import { wheelScrollDelta } from '../src/primitives/scroll-strip/wheel-scroll-delta';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const css = (path) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');
const ignore = () => undefined;
const CHIPS = ['Game Flow', 'Received Items', 'Movement', 'Combat', 'Dialog', 'Quality of Life', 'Cheats', 'Tracker', 'Vanilla Safe']
  .map((label) => ({ id: label, label }));

const fakeTrack = (metrics) => {
  const track = { ...metrics, children: [], ownerDocument: { defaultView: {} } };
  track.scrollBy = vi.fn(({ left }) => { track.scrollLeft += left; });
  return track;
};

const mountStrip = (metrics) => {
  const listeners = {};
  const root = { addEventListener: (type, fn) => { listeners[type] = fn; }, removeEventListener: ignore };
  const track = fakeTrack(metrics);
  const strip = mountHook(() => useScrollStrip(CHIPS.length));
  strip.current.rootRef.current = root;
  strip.current.trackRef.current = track;
  strip.strictRemount();
  strip.act(ignore);
  const wheel = (deltaY, deltaX = 0) => {
    const event = { deltaX, deltaY, preventDefault: vi.fn() };
    listeners.wheel(event);
    return event;
  };
  return { strip, track, wheel };
};

describe('the wheel on a chip row or a tab strip', () => {
  it('scrolls an overflowing row sideways without Shift, and lets the page scroll at the end', () => {
    const { track, wheel } = mountStrip({ scrollLeft: 0, scrollWidth: 900, clientWidth: 300 });
    expect(wheel(100).preventDefault).toHaveBeenCalled();
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: 100 });
    track.scrollLeft = 600;
    expect(wheel(100).preventDefault).not.toHaveBeenCalled();
    expect(wheel(-40).preventDefault).toHaveBeenCalled();
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: -40 });
  });

  it('leaves the wheel to the page when the row fits, and a sideways gesture to the browser', () => {
    const { track, wheel } = mountStrip({ scrollLeft: 0, scrollWidth: 300, clientWidth: 300 });
    expect(wheel(100).preventDefault).not.toHaveBeenCalled();
    expect(track.scrollBy).not.toHaveBeenCalled();
    expect(wheelScrollDelta({ deltaX: 50, deltaY: 10 }, { scrollLeft: 0, scrollWidth: 900, clientWidth: 300 })).toBeNull();
  });

  it('shows the arrows only while the row overflows', () => {
    expect(mountStrip({ scrollLeft: 0, scrollWidth: 900, clientWidth: 300 }).strip.current).toMatchObject({ canScrollBack: false, canScrollForward: true });
    expect(mountStrip({ scrollLeft: 0, scrollWidth: 300, clientWidth: 300 }).strip.current).toMatchObject({ canScrollBack: false, canScrollForward: false });
  });
});

describe('a header chip row never wraps', () => {
  it('draws HeaderAnchorNav and Tabs on the same scrolling strip', () => {
    const chips = renderToString(h(HeaderAnchorNav, { items: CHIPS, activeId: 'Combat', onSelect: ignore, ariaLabel: 'Game sections' }));
    expect(chips).toMatch(/^<nav class="scroll-strip header-anchor-nav" aria-label="Game sections"><ul class="scroll-strip__track header-anchor-nav__list">/);
    const tabs = renderToString(h(Tabs, { tabs: CHIPS, activeTab: 'Combat', onTabChange: ignore }));
    expect(tabs).toMatch(/^<nav class="scroll-strip tabs"><div class="scroll-strip__track tabs__strip" role="tablist">/);
  });

  it('keeps every label on one line and every chip on one row', () => {
    expect(css('primitives/scroll-strip/ScrollStrip.css')).toMatch(/\.scroll-strip__track > \* \{\s+flex-shrink: 0;/);
    expect(css('primitives/scroll-strip/ScrollStrip.css')).toMatch(/overflow: auto hidden;/);
    expect(css('composites/HeaderAnchorNav/HeaderAnchorNav.css')).toMatch(/\.header-anchor-nav__item \{[^}]*white-space: nowrap;/);
    for (const path of ['composites/HeaderAnchorNav/HeaderAnchorNav.css', 'composites/SettingsPage/SettingsPage.css']) {
      expect(css(path)).not.toContain('flex-wrap: wrap');
    }
  });
});

describe('the chip row beside the page title', () => {
  const rect = (left, width) => ({ getBoundingClientRect: () => ({ left, right: left + width, width }) });
  const chips = [rect(0, 90), rect(94, 120), rect(218, 80)];
  const part = { querySelector: () => ({ clientWidth: 200, children: chips }), getBoundingClientRect: () => ({ width: 217 }) };

  it('needs room for two of its widest chips, or all of them when they are fewer', () => {
    expect(stripLeastWidth(part)).toBe(17 + 240);
    const short = { ...part, querySelector: () => ({ clientWidth: 200, children: chips.slice(0, 1) }) };
    expect(stripLeastWidth(short)).toBe(17 + 90);
    expect(stripLeastWidth({ querySelector: () => null })).toBeNull();
  });

  it('stays beside the whole title while that room is left, then moves under it', () => {
    const space = { widths: [24, 70], strip: 257, gap: 12, room: 400 };
    expect(stackOf(space)).toBe('row');
    expect(stackOf({ ...space, room: 300 })).toBe('strip');
    expect(stackOf({ ...space, room: 60 })).toBe('all');
  });
});
