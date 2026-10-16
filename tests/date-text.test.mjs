/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DateText } from '../src/composites/DateText';
import { liveClock } from '../src/composites/DateText/behavior/live-clock';
import { cellContent } from '../src/composites/DataTable/behavior/cell-content';
import { buildSchema } from '../src/data';
import { formatDate } from '../src/primitives/date-format';
import { formatValue } from '../src/primitives/listbox/format-value';
import { TesseraProvider } from '../src/primitives/TesseraProvider';

const AT = new Date(2026, 9, 16, 21, 40, 12);
const NOW = AT.getTime();
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const FRENCH = { locale: 'fr', justNow: "À l'instant", today: "Aujourd'hui", yesterday: 'Hier', tomorrow: 'Demain', dayAt: (day, time) => `${day} à ${time}` };

const plain = (text) => text.replace(/[\u202f\u00a0]/g, ' ');
const en = (format, length) => plain(formatDate(AT, format, { length, locale: 'en-US', now: NOW }));
const fr = (format, length) => plain(formatDate(AT, format, { length, strings: FRENCH, now: NOW }));
const ago = (offset, length, strings) => formatDate(NOW - offset, 'relative', { length, now: NOW, strings: strings ?? { locale: 'en-US' } });
const day = (offset, length, strings) => plain(formatDate(NOW + offset, 'calendar', { length, now: NOW, strings: strings ?? { locale: 'en-US' } }));

afterEach(() => vi.useRealTimers());

describe('formatDate', () => {
  it('writes every preset in three lengths, in English and in French', () => {
    expect([en('date', 'short'), en('date'), en('date', 'long')]).toEqual(['10/16/26', 'Oct 16, 2026', 'October 16, 2026']);
    expect([en('time'), en('time', 'medium')]).toEqual(['9:40 PM', '9:40:12 PM']);
    expect([en('datetime'), en('weekday', 'short'), en('weekday'), en('weekday', 'long')]).toEqual(['Oct 16, 2026, 9:40 PM', 'Fri', 'Friday', 'Friday, October 16']);
    expect([en('month', 'short'), en('month'), en('month', 'long')]).toEqual(['Oct', 'October', 'October 2026']);
    expect([fr('date'), fr('date', 'long'), fr('time'), fr('datetime'), fr('weekday'), fr('month', 'long')])
      .toEqual(['16 oct. 2026', '16 octobre 2026', '21:40', '16 oct. 2026, 21:40', 'vendredi', 'octobre 2026']);
    expect([en('iso', 'short'), en('iso')]).toEqual(['2026-10-16', '2026-10-16 21:40']);
    expect(en('iso', 'long')).toMatch(/^2026-10-16T21:40:12[+-]\d\d:\d\d$/);
    expect(plain(formatDate(AT, { month: 'short', day: 'numeric' }, { locale: 'en-US' }))).toBe('Oct 16');
  });

  it('reads Just now under a minute, then the whole units passed, ahead of now too', () => {
    expect([ago(0), ago(59 * SECOND), ago(-59 * SECOND)]).toEqual(['Just now', 'Just now', 'Just now']);
    expect([ago(MINUTE), ago(HOUR - SECOND), ago(HOUR), ago(DAY - SECOND)]).toEqual(['1 minute ago', '59 minutes ago', '1 hour ago', '23 hours ago']);
    expect([ago(DAY), ago(7 * DAY - SECOND), ago(7 * DAY), ago(29 * DAY)]).toEqual(['Yesterday', '6 days ago', 'Last week', '4 weeks ago']);
    expect([ago(30 * DAY), ago(364 * DAY), ago(365 * DAY), ago(800 * DAY)]).toEqual(['Last month', '12 months ago', 'Last year', '2 years ago']);
    expect([ago(-10 * MINUTE), ago(-DAY), ago(-3 * DAY)]).toEqual(['In 10 minutes', 'Tomorrow', 'In 3 days']);
    expect([ago(5 * MINUTE, 'medium'), ago(5 * MINUTE, 'short')]).toEqual(['5 min. ago', '5m ago']);
    expect([ago(5 * MINUTE, 'long', FRENCH), ago(DAY, 'long', FRENCH), ago(SECOND, 'long', FRENCH)]).toEqual(['Il y a 5 minutes', 'Hier', "À l'instant"]);
  });

  it('names the day for calendar: today, yesterday, tomorrow, a weekday within six days, then the date', () => {
    expect([day(-2 * HOUR), day(-DAY), day(DAY)]).toEqual(['Today, 7:40 PM', 'Yesterday, 9:40 PM', 'Tomorrow, 9:40 PM']);
    expect([day(-4 * DAY), day(-4 * DAY, 'short'), day(-10 * DAY)]).toEqual(['Monday, 9:40 PM', 'Mon, 9:40 PM', 'Oct 6, 2026, 9:40 PM']);
    expect([day(-HOUR, 'medium', FRENCH), day(-22 * HOUR, 'medium', FRENCH), day(-4 * DAY, 'medium', FRENCH)])
      .toEqual(["Aujourd'hui à 20:40", 'Hier à 23:40', 'lundi à 21:40']);
  });

  it('leaves a value it cannot read empty, and the columns of Select and DataTable use the same text', () => {
    expect([formatDate('not a date'), formatDate(Number.NaN)]).toEqual(['', '']);
    expect(formatValue(AT, 'calendar')).toBe(formatDate(AT, 'calendar'));
    expect(formatValue(NOW, 'date')).toBe(formatDate(NOW, 'date'));
    expect(formatValue('later', 'datetime')).toBe('later');
    const [field] = buildSchema([{ savedAt: NOW }], { dates: { savedAt: 'calendar' } });
    expect(field.date).toBe('calendar');
    const cell = cellContent({ savedAt: NOW }, 'savedAt', field);
    expect(cell.type).toBe(DateText);
    expect(cell.props.format).toBe('calendar');
  });
});

describe('DateText', () => {
  it('is a time element with the exact moment, wrapped in a Tooltip for relative and calendar', () => {
    const iso = AT.toISOString();
    const relative = renderToString(h(DateText, { value: AT, format: 'relative' }));
    expect(relative).toMatch(/^<span class="tooltip-anchor">/);
    expect(relative).toContain(`<time class="text-el text-el--time date-text" dateTime="${iso}">`);
    expect(renderToString(h(DateText, { value: AT, format: 'date' }))).toMatch(/^<time /);
    expect(renderToString(h(DateText, { value: AT, format: 'date', tooltip: true }))).toMatch(/^<span class="tooltip-anchor">/);
    expect(renderToString(h(DateText, { value: AT, format: 'calendar', tooltip: false }))).toMatch(/^<time /);
    expect(renderToString(h(DateText, { value: AT, format: 'relative', focusable: true }))).toContain('tabindex="0"');
    expect(renderToString(h(DateText, { value: 'never' }))).toBe('');
  });

  it('takes its locale and words from the dates strings', () => {
    const html = renderToString(h(TesseraProvider, { overrides: { strings: { dates: FRENCH } } }, h(DateText, { value: Date.now() - 5 * MINUTE, format: 'relative' })));
    expect(html).toContain('>Il y a 5 minutes</time>');
    expect(renderToString(h(DateText, { value: Date.now(), format: 'relative' }))).toContain('>Just now</time>');
  });

  it('runs one timer for every live value, ticks every 10 s and stops with the last one', () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(globalThis, 'setInterval');
    const a = vi.fn();
    const b = vi.fn();
    const stopA = liveClock.subscribe(a);
    const stopB = liveClock.subscribe(b);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(liveClock.watchers()).toBe(2);
    const before = liveClock.read();
    vi.advanceTimersByTime(10 * SECOND);
    expect([a.mock.calls.length, b.mock.calls.length]).toEqual([1, 1]);
    expect(liveClock.read() - before).toBe(10 * SECOND);
    stopA();
    stopB();
    expect(liveClock.watchers()).toBe(0);
    vi.advanceTimersByTime(MINUTE);
    expect(a).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
