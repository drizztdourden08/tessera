/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Icon } from '../src/primitives/Icon';
import { createPopScheduler } from '../src/primitives/Icon/behavior/create-pop-scheduler';
import { iconSamplesFor } from '../src/primitives/Icon/behavior/icon-samples-for';
import { nextPopDelay } from '../src/primitives/Icon/behavior/next-pop-delay';
import { popSpots } from '../src/primitives/Icon/behavior/pop-spots';
import { resolveIconEffect } from '../src/primitives/Icon/behavior/resolve-icon-effect';
import { spreadSamples } from '../src/primitives/Icon/behavior/spread-samples';

const line = (x1, y1, x2, y2) => ({
  length: Math.hypot(x2 - x1, y2 - y1),
  pointAt: (share) => ({ x: x1 + (x2 - x1) * share, y: y1 + (y2 - y1) * share }),
});
const isSampled = (points) => (spot) => points.some((point) => point.x === spot.x && point.y === spot.y);
const sequence = (...values) => {
  let at = 0;
  return () => values[at++ % values.length];
};

describe('sampling the drawn shape', () => {
  it('spreads the samples along the painted length, so a longer shape gets more of them', () => {
    const points = spreadSamples([line(0, 0, 30, 0), line(0, 10, 0, 20)], 8);
    expect(points).toHaveLength(8);
    expect(points.filter((point) => point.shape === 0)).toHaveLength(6);
    expect(points.filter((point) => point.shape === 1)).toHaveLength(2);
    expect(points.filter((point) => point.shape === 0).every((point) => point.y === 0 && point.x > 0 && point.x < 30)).toBe(true);
    expect(points.filter((point) => point.shape === 1).every((point) => point.x === 0 && point.y > 10 && point.y < 20)).toBe(true);
  });

  it('skips shapes with no length and gives nothing when nothing is drawn', () => {
    expect(spreadSamples([line(5, 5, 5, 5)], 8)).toEqual([]);
    const points = spreadSamples([line(5, 5, 5, 5), line(0, 0, 10, 0)], 4);
    expect(points.every((point) => point.shape === 1)).toBe(true);
  });

  it('reads the samples once per icon and key, and again when the key changes', () => {
    const icon = { body: '<path d="M0 0h1"/>' };
    const samples = { viewBox: '0 0 24 24', span: 24, points: [{ x: 1, y: 1, shape: 0 }] };
    const read = vi.fn(() => samples);
    expect(iconSamplesFor(icon, '16|0|', read)).toBe(samples);
    expect(iconSamplesFor(icon, '16|0|', read)).toBe(samples);
    expect(read).toHaveBeenCalledTimes(1);
    iconSamplesFor(icon, '32|0|', read);
    expect(read).toHaveBeenCalledTimes(2);
  });

  it('does not keep a failed read, so the next try measures again', () => {
    const icon = { body: '' };
    const read = vi.fn(() => null);
    expect(iconSamplesFor(icon, 'k', read)).toBeNull();
    iconSamplesFor(icon, 'k', read);
    expect(read).toHaveBeenCalledTimes(2);
  });
});

describe('picking where a pop lands', () => {
  const points = spreadSamples([line(0, 0, 20, 0), line(0, 5, 20, 5)], 20);

  it('lands each pop on a sampled point, each on its own point', () => {
    const spots = popSpots(points, 'twinkle', 3, sequence(0.1, 0.1, 0.5, 0.9));
    expect(spots).toHaveLength(3);
    expect(spots.every(isSampled(points))).toBe(true);
    expect(new Set(spots.map((spot) => `${spot.x},${spot.y}`)).size).toBe(3);
    expect(spots.every((spot) => spot.trail === '')).toBe(true);
  });

  it('runs a shimmer along the next points of the same shape only', () => {
    const trailOf = (spot) => spot.trail.split(' ').map((pair) => pair.split(',').map(Number));
    const [early] = popSpots(points, 'shimmer', 1, () => 0.2);
    expect(trailOf(early).length).toBeGreaterThan(1);
    expect(trailOf(early).every(([, y]) => y === 0)).toBe(true);
    expect(trailOf(early)[0]).toEqual([early.x, early.y]);
    const [last] = popSpots(points, 'shimmer', 1, () => 0.45);
    expect(trailOf(last).length).toBeGreaterThan(1);
    expect(trailOf(last).every(([, y]) => y === 0)).toBe(true);
    expect(trailOf(last).at(-1)).toEqual([last.x, last.y]);
  });
});

describe('scheduling the pops', () => {
  afterEach(() => vi.useRealTimers());

  it('keeps every wait inside every plus or minus jitter, and never below the floor', () => {
    expect(nextPopDelay(1000, 200, 0)).toBe(800);
    expect(nextPopDelay(1000, 200, 1)).toBe(1200);
    expect(nextPopDelay(1000, 200, 0.5)).toBe(1000);
    expect(nextPopDelay(100, 400, 0)).toBe(120);
  });

  it('runs one timer, beats at the interval and stops for good', () => {
    vi.useFakeTimers();
    const onBeat = vi.fn();
    const scheduler = createPopScheduler({ every: 1000, jitter: 0, onBeat, random: () => 0.5 });
    scheduler.start();
    scheduler.start();
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(500);
    expect(onBeat).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(999);
    expect(onBeat).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1);
    expect(onBeat).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(3000);
    expect(onBeat).toHaveBeenCalledTimes(5);
    scheduler.stop();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(5000);
    expect(onBeat).toHaveBeenCalledTimes(5);
  });

  it('fills in the defaults and clamps the options', () => {
    expect(resolveIconEffect('ping')).toEqual({ kind: 'ping', every: 3500, jitter: 875, color: 'primary', count: 1 });
    expect(resolveIconEffect({ kind: 'dot', every: 10, jitter: -5, count: 0, color: 'danger' }))
      .toEqual({ kind: 'dot', every: 120, jitter: 0, color: 'danger', count: 1 });
  });
});

describe('Icon effect', () => {
  it('wraps the icon with a hidden layer that starts empty, and keeps the accessible name', () => {
    const html = renderToString(h(Icon, { name: 'search', size: 24, label: 'Search', effect: { kind: 'glint', color: 'secondary' } }));
    expect(html).toContain('class="icon-effect icon-effect--secondary"');
    expect(html).toContain('data-effect="glint"');
    expect(html).toContain('aria-label="Search"');
    expect(html).toMatch(/<svg class="icon-effect__layer" aria-hidden="true" focusable="false"><\/svg>/);
    expect(html).not.toContain('icon-effect__pop');
  });

  it('draws the bare svg without an effect', () => {
    const html = renderToString(h(Icon, { name: 'search' }));
    expect(html.startsWith('<svg')).toBe(true);
    expect(html).not.toContain('icon-effect');
  });
});
