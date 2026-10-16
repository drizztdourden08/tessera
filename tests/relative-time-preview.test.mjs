/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { minuteClock } from '../stories/preview/RelativeTime/behavior/minute-clock';
import { relativeTimeText } from '../stories/preview/RelativeTime/behavior/relative-time-text';
import { TIME_STRINGS } from '../stories/preview/RelativeTime/relative-time.constants';

const NOW = Date.UTC(2026, 9, 16, 12, 0, 0);
const MINUTE = 60_000;
const text = (offset, format = 'long', strings = TIME_STRINGS) => relativeTimeText(NOW + offset, NOW, format, strings).text;

afterEach(() => vi.useRealTimers());

describe('RelativeTime preview', () => {
  it('reads Just now under a minute, then the nearest whole unit, ahead or behind', () => {
    expect(text(-20_000)).toBe('Just now');
    expect(text(-5 * MINUTE)).toBe('5 minutes ago');
    expect(text(-5 * MINUTE, 'short')).toMatch(/^5 mins?\.? ago$/);
    expect(text(-180 * MINUTE)).toBe('3 hours ago');
    expect(text(-26 * 60 * MINUTE)).toBe('Yesterday');
    expect(text(10 * MINUTE)).toBe('In 10 minutes');
  });

  it('takes the locale and Just now from the strings', () => {
    const french = { ...TIME_STRINGS, locale: 'fr', justNow: "À l'instant" };
    expect(text(-5 * MINUTE, 'long', french)).toBe('Il y a 5 minutes');
    expect(text(-1000, 'long', french)).toBe("À l'instant");
    expect(relativeTimeText(NOW, NOW, 'long', TIME_STRINGS).iso).toBe('2026-10-16T12:00:00.000Z');
  });

  it('runs one timer for every watcher, ticks each minute and stops with the last one', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(globalThis, 'setInterval');
    const a = vi.fn();
    const b = vi.fn();
    const stopA = minuteClock.subscribe(a);
    const stopB = minuteClock.subscribe(b);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(minuteClock.watchers()).toBe(2);
    vi.advanceTimersByTime(MINUTE);
    expect([a.mock.calls.length, b.mock.calls.length]).toEqual([1, 1]);
    stopA();
    stopB();
    expect(minuteClock.watchers()).toBe(0);
    vi.advanceTimersByTime(MINUTE);
    expect(a).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
