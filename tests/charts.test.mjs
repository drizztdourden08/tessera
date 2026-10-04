/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StackedBar } from '../src/primitives/StackedBar';
import { barTracks } from '../src/primitives/StackedBar/behavior/bar-tracks';
import { groupSegments } from '../src/primitives/StackedBar/behavior/group-segments';
import { sharePercent } from '../src/primitives/StackedBar/behavior/share-percent';
import { StatTile } from '../src/composites/StatTile';
import { trendTone } from '../src/composites/StatTile/behavior/trend-tone';
import { Gauge } from '../src/primitives/Gauge';
import { arcPath } from '../src/primitives/Gauge/behavior/arc-path';
import { gaugeFraction } from '../src/primitives/Gauge/behavior/gauge-fraction';
import { gaugeThresholds } from '../src/primitives/Gauge/behavior/gauge-thresholds';
import { gaugeTone } from '../src/primitives/Gauge/behavior/gauge-tone';
import { gaugeZones } from '../src/primitives/Gauge/behavior/gauge-zones';
import { Sparkline } from '../src/primitives/Sparkline';
import { inBand } from '../src/primitives/Sparkline/behavior/in-band';
import { sparklineBandBox } from '../src/primitives/Sparkline/behavior/sparkline-band-box';
import { sparklineDomain } from '../src/primitives/Sparkline/behavior/sparkline-domain';
import { sparklineGeometry } from '../src/primitives/Sparkline/behavior/sparkline-geometry';

const segment = (id, value, color) => ({ id, label: id, value, ...(color ? { color } : {}) });

describe('the sparkline domain', () => {
  it('follows the samples, takes fixed ends, and never collapses to a point', () => {
    expect(sparklineDomain([3, 9, 5])).toEqual({ low: 3, high: 9 });
    expect(sparklineDomain([3, 9, 5], 0, 100)).toEqual({ low: 0, high: 100 });
    expect(sparklineDomain([3, 9, 5], 0)).toEqual({ low: 0, high: 9 });
    expect(sparklineDomain([50, 50])).toEqual({ low: 50, high: 51 });
    expect(sparklineDomain([], undefined, 10)).toEqual({ low: 0, high: 10 });
    expect(sparklineDomain([], 20)).toEqual({ low: 20, high: 21 });
    expect(sparklineDomain([])).toEqual({ low: 0, high: 1 });
  });
});

describe('the sparkline path', () => {
  const domain = { low: 0, high: 100 };

  it('runs from the left edge to the right edge, top at the high end', () => {
    const { line, area, end } = sparklineGeometry([0, 50, 100], domain);
    expect(line).toBe('M0 100 L50 50 L100 0');
    expect(area).toBe('M0 100 L50 50 L100 0 L100 100 L0 100 Z');
    expect(end).toEqual({ x: 100, y: 0 });
  });

  it('keeps room for length samples, so a short series sits at the right', () => {
    expect(sparklineGeometry([20, 40], domain, 5).line).toBe('M75 80 L100 60');
    expect(sparklineGeometry([1, 2, 3, 4, 5, 6], { low: 0, high: 10 }, 3).line).toBe('M0 60 L50 50 L100 40');
  });

  it('clamps samples outside a fixed domain, rounds to two places and skips gaps', () => {
    expect(sparklineGeometry([-20, 140], domain).line).toBe('M0 100 L100 0');
    expect(sparklineGeometry([0, 1, 2], { low: 0, high: 3 }).line).toBe('M0 100 L50 66.67 L100 33.33');
    expect(sparklineGeometry([5, Number.NaN], { low: 0, high: 10 }).line).toBe('M0 50');
  });

  it('draws nothing for no samples and one point at the right edge for one', () => {
    expect(sparklineGeometry([], domain)).toEqual({ line: '', area: '', end: null });
    expect(sparklineGeometry([25], domain).end).toEqual({ x: 100, y: 75 });
  });
});

describe('the sparkline band', () => {
  const domain = { low: 0, high: 100 };

  it('shades from its start to the top with one dashed edge', () => {
    expect(sparklineBandBox({ from: 80 }, domain)).toEqual({ top: 0, bottom: 20, edges: [20] });
  });

  it('shades a range between two edges, and clips to the domain', () => {
    expect(sparklineBandBox({ from: 40, to: 70 }, domain)).toEqual({ top: 30, bottom: 60, edges: [60, 30] });
    expect(sparklineBandBox({ from: -50, to: 60 }, domain)).toEqual({ top: 40, bottom: 100, edges: [40] });
    expect(sparklineBandBox({ from: 120 }, domain)).toBeNull();
    expect(sparklineBandBox(undefined, domain)).toBeNull();
  });

  it('knows when the latest sample sits inside the band', () => {
    expect(inBand(85, { from: 80 })).toBe(true);
    expect(inBand(75, { from: 80 })).toBe(false);
    expect(inBand(65, { from: 0, to: 60 })).toBe(false);
    expect(inBand(undefined, { from: 0 })).toBe(false);
  });
});

describe('the gauge', () => {
  it('draws a 270 degree arc open at the bottom', () => {
    expect(arcPath({ x: 50, y: 50, radius: 42 }, 135, 405)).toBe('M20.3 79.7 A42 42 0 1 1 79.7 79.7');
    expect(arcPath({ x: 0, y: 0, radius: 10 }, 0, 90)).toBe('M10 0 A10 10 0 0 1 0 10');
  });

  it('fills to the share of its range and stops at either end', () => {
    expect(gaugeFraction(25, 0, 100)).toBe(0.25);
    expect(gaugeFraction(140, 0, 100)).toBe(1);
    expect(gaugeFraction(-5, 0, 100)).toBe(0);
    expect(gaugeFraction(60, 20, 120)).toBe(0.4);
    expect(gaugeFraction(Number.NaN, 0, 100)).toBe(0);
    expect(gaugeFraction(5, 10, 10)).toBe(0);
  });

  it('turns warning at 60% and danger at 85% of its range by default', () => {
    expect(gaugeThresholds(0, 100)).toEqual({ warning: 60, danger: 85 });
    expect(gaugeThresholds(0, 200)).toEqual({ warning: 120, danger: 170 });
    const edges = gaugeThresholds(0, 100);
    expect(gaugeTone(59.9, edges)).toBe('success');
    expect(gaugeTone(60, edges)).toBe('warning');
    expect(gaugeTone(84, edges)).toBe('warning');
    expect(gaugeTone(85, edges)).toBe('danger');
  });

  it('reads a danger edge below the warning edge as low is bad', () => {
    const fps = { warning: 60, danger: 30 };
    expect(gaugeTone(144, fps)).toBe('success');
    expect(gaugeTone(60, fps)).toBe('warning');
    expect(gaugeTone(29, fps)).toBe('danger');
    expect(gaugeZones(0, 120, fps)).toEqual([
      { tone: 'danger', start: 0, length: 25 },
      { tone: 'warning', start: 25, length: 25 },
      { tone: 'success', start: 50, length: 50 },
    ]);
  });

  it('splits the arc into zones in path units, dropping empty ones', () => {
    expect(gaugeZones(0, 100, { warning: 60, danger: 85 })).toEqual([
      { tone: 'success', start: 0, length: 60 },
      { tone: 'warning', start: 60, length: 25 },
      { tone: 'danger', start: 85, length: 15 },
    ]);
    expect(gaugeZones(0, 100, { warning: 0, danger: 100 }).map((zone) => zone.tone)).toEqual(['warning']);
  });

  it('is a meter with its value, unit and bounds', () => {
    const html = renderToString(h(Gauge, { value: 72, unit: '%', label: 'CPU' }));
    expect(html).toContain('role="meter"');
    expect(html).toContain('aria-valuenow="72"');
    expect(html).toContain('aria-valuetext="72 %"');
    expect(html).toContain('data-tone="warning"');
  });
});

describe('the stat tile trend', () => {
  it('colours a rise by what it means', () => {
    expect(trendTone('up', 'good')).toBe('success');
    expect(trendTone('up', 'bad')).toBe('danger');
    expect(trendTone('down', 'good')).toBe('danger');
    expect(trendTone('down', 'bad')).toBe('success');
    expect(trendTone('up', 'neutral')).toBe('neutral');
    expect(trendTone('flat', 'good')).toBe('neutral');
    expect(trendTone(undefined, 'good')).toBe('neutral');
  });

  it('names the trend arrow for a screen reader', () => {
    const html = renderToString(h(StatTile, { label: 'Frame rate', value: 144, unit: 'fps', delta: '+4', trend: 'up' }));
    expect(html).toContain('aria-label="Rising"');
    expect(html).toContain('status--success');
  });
});

describe('the stacked bar', () => {
  it('keeps every part under the limit, in order, with the tag colours in turn', () => {
    const parts = groupSegments([segment('a', 3), segment('b', 1, 'danger'), segment('c', 2)], 6, 'Other');
    expect(parts.map((part) => [part.id, part.color])).toEqual([['a', 'blue'], ['b', 'danger'], ['c', 'teal']]);
  });

  it('groups the smallest parts past the limit into Other, keeping the order of the rest', () => {
    const segments = [segment('a', 5), segment('b', 0.2), segment('c', 3), segment('d', 0.1), segment('e', 4), segment('f', 0.3)];
    const parts = groupSegments(segments, 4, 'Other');
    expect(parts.map((part) => part.id)).toEqual(['a', 'c', 'e', 'stacked-bar:other']);
    const other = parts[3];
    expect(other.value).toBeCloseTo(0.6);
    expect(other.grouped).toBe(3);
    expect(other.color).toBe('neutral');
  });

  it('drops empty parts and puts everything in Other at a limit of one', () => {
    expect(groupSegments([segment('a', 0), segment('b', -2), segment('c', 4)], 6, 'Other').map((part) => part.id)).toEqual(['c']);
    const all = groupSegments([segment('a', 2), segment('b', 3)], 1, 'Other');
    expect(all).toHaveLength(1);
    expect(all[0].value).toBe(5);
  });

  it('sizes each track by its share, with free room after the parts', () => {
    const parts = groupSegments([segment('a', 4), segment('b', 4)], 6, 'Other');
    expect(barTracks(parts)).toEqual({ sizes: ['0.5fr', '0.5fr'], capacity: 8, free: 0 });
    expect(barTracks(parts, 16)).toEqual({ sizes: ['0.25fr', '0.25fr', '0.5fr'], capacity: 16, free: 8 });
    expect(barTracks(parts, 4).capacity).toBe(8);
    expect(barTracks([]).sizes).toEqual([]);
  });

  it('writes a share as a whole percent, and under one as <1%', () => {
    expect(sharePercent(1, 3)).toBe('33%');
    expect(sharePercent(0.004, 1)).toBe('<1%');
    expect(sharePercent(1, 0)).toBe('0%');
  });

  it('names the bar with every part and lists Other with its count', () => {
    const segments = [segment('Game', 4), segment('Chat', 1), segment('Tray', 0.5), segment('Fonts', 0.25)];
    const html = renderToString(h(StackedBar, { segments, limit: 2, legend: true, label: 'Memory' }));
    expect(html).toContain('aria-label="Memory: Game 4, Other (3) 1.8"');
    expect(html).toContain('Other (3)');
  });
});

describe('the sparkline label', () => {
  it('is decorative without a label and sums up the samples with one', () => {
    expect(renderToString(h(Sparkline, { values: [1, 2] }))).toContain('aria-hidden="true"');
    const named = renderToString(h(Sparkline, { values: [12, 48, 30], label: 'CPU' }));
    expect(named).toContain('role="img"');
    expect(named).toContain('aria-label="CPU: latest 30, low 12, high 48"');
    expect(renderToString(h(Sparkline, { values: [], label: 'CPU' }))).toContain('CPU: no samples yet');
  });
});
