/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DateText } from '../src/composites/DateText';
import { elapsedClock } from '../src/composites/DateText/behavior/elapsed-clock';
import { elapsedDue } from '../src/composites/DateText/behavior/elapsed-due';
import { formatDate } from '../src/primitives/date-format';
import { TesseraProvider } from '../src/primitives/TesseraProvider';

const START = new Date(2026, 9, 16, 21, 40, 12).getTime();
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const since = (offset, options) => formatDate(START, 'elapsed', { now: START + offset, ...options });

afterEach(() => vi.useRealTimers());

describe('elapsed text', () => {
  it('writes seconds, then minutes and seconds, then hours and minutes, then days and hours', () => {
    expect([since(0), since(12 * SECOND), since(59 * SECOND)]).toEqual(['0s', '12s', '59s']);
    expect([since(MINUTE), since(4 * MINUTE + 3 * SECOND), since(HOUR - SECOND)]).toEqual(['1m 00s', '4m 03s', '59m 59s']);
    expect([since(HOUR), since(HOUR + 2 * MINUTE), since(DAY - SECOND)]).toEqual(['1h 00m', '1h 02m', '23h 59m']);
    expect([since(DAY), since(2 * DAY + 3 * HOUR), since(40 * DAY + 23 * HOUR + 59 * MINUTE)]).toEqual(['1d 0h', '2d 3h', '40d 23h']);
  });

  it('reads 0s before the start and an empty text for a value it cannot read', () => {
    expect(since(-5 * MINUTE)).toBe('0s');
    expect(formatDate('never', 'elapsed')).toBe('');
  });

  it('puts the label in front and takes the units and the word order from the dates strings', () => {
    expect(since(12 * SECOND, { label: 'running' })).toBe('running 12s');
    const strings = { elapsedUnits: { second: ' s', minute: ' min', hour: ' h', day: ' j' }, elapsedLabel: (label, time) => `${time} ${label}` };
    expect(since(4 * MINUTE + 3 * SECOND, { label: 'en cours', strings })).toBe('4 min 03 s en cours');
    expect(since(2 * DAY + 3 * HOUR, { strings })).toBe('2 j 3 h');
  });
});

describe('elapsed due time', () => {
  it('is the next second under an hour, the next minute under a day, then the next hour', () => {
    expect(elapsedDue(START, START + 12_400)).toBe(START + 13 * SECOND);
    expect(elapsedDue(START, START + HOUR - 1)).toBe(START + HOUR);
    expect(elapsedDue(START, START + HOUR)).toBe(START + HOUR + MINUTE);
    expect(elapsedDue(START, START + 5 * HOUR + 20 * SECOND)).toBe(START + 5 * HOUR + MINUTE);
    expect(elapsedDue(START, START + DAY - 1)).toBe(START + DAY);
    expect(elapsedDue(START, START + DAY)).toBe(START + DAY + HOUR);
    expect(elapsedDue(START, START + 2 * DAY + 30 * MINUTE)).toBe(START + 2 * DAY + HOUR);
    expect(elapsedDue(START, START - HOUR)).toBe(START + SECOND);
  });
});

describe('elapsed clock', () => {
  it('runs one timer for every watcher, ticks each on its own scale and stops with the last one', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(globalThis, 'setTimeout');
    const now = Date.now();
    const fresh = vi.fn();
    const older = vi.fn();
    const stopFresh = elapsedClock.subscribe(fresh, now - 5 * SECOND);
    const stopOlder = elapsedClock.subscribe(older, now - 3 * HOUR);
    expect(elapsedClock.watchers()).toBe(2);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(3 * SECOND);
    expect([fresh.mock.calls.length, older.mock.calls.length]).toEqual([3, 0]);
    expect(elapsedClock.read()).toBe(now + 3 * SECOND);
    vi.advanceTimersByTime(MINUTE);
    expect(older.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(older.mock.calls.length).toBeLessThanOrEqual(2);
    stopFresh();
    expect(vi.getTimerCount()).toBe(1);
    stopOlder();
    expect(elapsedClock.watchers()).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    const calls = fresh.mock.calls.length;
    vi.advanceTimersByTime(MINUTE);
    expect(fresh.mock.calls.length).toBe(calls);
    spy.mockRestore();
  });

  it('pauses while the page is hidden and catches up when it shows again', () => {
    vi.useFakeTimers();
    const handlers = new Set();
    const change = () => handlers.forEach((handler) => handler());
    let state = 'visible';
    vi.stubGlobal('document', {
      get visibilityState() { return state; },
      addEventListener: (type, handler) => handlers.add(handler),
      removeEventListener: (type, handler) => handlers.delete(handler),
    });
    const listener = vi.fn();
    const stop = elapsedClock.subscribe(listener, Date.now());
    vi.advanceTimersByTime(2 * SECOND);
    expect(listener).toHaveBeenCalledTimes(2);
    state = 'hidden';
    change();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(10 * SECOND);
    expect(listener).toHaveBeenCalledTimes(2);
    state = 'visible';
    change();
    expect(listener).toHaveBeenCalledTimes(3);
    expect(vi.getTimerCount()).toBe(1);
    stop();
    expect(vi.getTimerCount()).toBe(0);
    vi.unstubAllGlobals();
  });
});

describe('DateText elapsed', () => {
  it('shows the time since the date, with the label and the exact moment in a Tooltip, and no live region', () => {
    const html = renderToString(h(DateText, { value: Date.now() - 12 * SECOND, format: 'elapsed', label: 'running' }));
    expect(html).toMatch(/^<span class="tooltip-anchor">/);
    expect(html).toMatch(/>running 1[2-3]s<\/time>/);
    expect(html).not.toContain('aria-live');
    expect(renderToString(h(DateText, { value: Date.now(), format: 'elapsed', tooltip: false }))).toMatch(/^<time /);
  });

  it('takes the label joiner from the dates strings', () => {
    const dates = { elapsedLabel: (label, time) => `${time} (${label})` };
    const html = renderToString(h(TesseraProvider, { overrides: { strings: { dates } } }, h(DateText, { value: Date.now() - 4 * MINUTE, format: 'elapsed', label: 'actif' })));
    expect(html).toMatch(/>4m 0\ds \(actif\)<\/time>/);
  });
});
