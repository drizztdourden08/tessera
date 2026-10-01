/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Slider } from '../src/primitives/Slider';
import { nearestThumb } from '../src/primitives/Slider/behavior/nearest-thumb';
import { snapValue } from '../src/primitives/Slider/behavior/snap-value';
import { trackFraction } from '../src/primitives/Slider/behavior/track-fraction';
import { fitLabels } from '../src/primitives/Slider/sub-components/SliderLabels/behavior/fit-labels';
import { resolveSliderLabels } from '../src/primitives/Slider/sub-components/SliderLabels/behavior/resolve-slider-labels';
import { ruleLabels } from '../src/primitives/Slider/sub-components/SliderLabels/behavior/rule-labels';

const scale = (min, max, step = 1, extra = {}) => ({ min, max, step, ...extra });
const texts = (rule, at) => {
  const { points, error } = ruleLabels(rule, at);
  expect(error).toBeNull();
  return points.map((point) => point.label);
};
const values = (rule, at) => ruleLabels(rule, at).points.map((point) => point.value);
const noop = () => undefined;

afterEach(() => vi.restoreAllMocks());

describe('label rules: where the labels go', () => {
  it('places every N from min, without floating point noise', () => {
    expect(texts('every 0.5 | {v}x', scale(0, 2, 0.25))).toEqual(['0x', '0.5x', '1x', '1.5x', '2x']);
    expect(values('every 0.1', scale(0, 0.3, 0.01))).toEqual([0, 0.1, 0.2, 0.3]);
  });

  it('spreads count N evenly on steps, and places the ends, the steps and listed values', () => {
    expect(values('count 5', scale(0, 100, 5))).toEqual([0, 25, 50, 75, 100]);
    expect(values('count 4', scale(0, 100, 5))).toEqual([0, 35, 65, 100]);
    expect(values('ends', scale(10, 90))).toEqual([10, 90]);
    expect(values('steps', scale(0, 4, 2))).toEqual([0, 2, 4]);
    expect(values('0, 250, 500, 1000', scale(0, 1000, 50))).toEqual([0, 250, 500, 1000]);
    expect(values('at min, 50, max', scale(0, 80))).toEqual([0, 50, 80]);
  });

  it('joins placements with +, drops values outside the range, and lets a named value win', () => {
    expect(texts('every 25 + 0=Off | {v}%', scale(0, 100))).toEqual(['Off', '25%', '50%', '75%', '100%']);
    expect(values('every 3 + ends', scale(0, 10))).toEqual([0, 3, 6, 9, 10]);
    expect(values('-10, 5, 200', scale(0, 100))).toEqual([5]);
    expect(values('none', scale(0, 100))).toEqual([]);
  });
});

describe('label rules: how each label reads', () => {
  it('formats numbers with a pattern', () => {
    expect(texts('ends | {v:0.0}', scale(0, 2))).toEqual(['0.0', '2.0']);
    expect(texts('0.125, 2 | {v:0.##}', scale(0, 2))).toEqual(['0.13', '2']);
    expect(texts('ends | {v:#,##0}', scale(0, 25000))).toEqual(['0', '25,000']);
    expect(texts('-5, 0, 5 | {v:+0}', scale(-5, 5))).toEqual(['-5', '0', '+5']);
  });

  it('works the value out first, and reads the percent along the track', () => {
    expect(texts('every 0.1 | {v*100:0}%', scale(0, 0.3, 0.01))).toEqual(['0%', '10%', '20%', '30%']);
    expect(texts('ends | {v/1000} s', scale(0, 2500))).toEqual(['0 s', '2.5 s']);
    expect(texts('count 3 | {p}%', scale(10, 30))).toEqual(['0%', '50%', '100%']);
  });

  it('picks plural forms and words', () => {
    expect(texts('0, 1, 2 | {v} {heart|hearts}', scale(0, 2))).toEqual(['0 hearts', '1 heart', '2 hearts']);
    expect(texts('0, 1, 2 | {no hearts|one heart|many hearts}', scale(0, 2))).toEqual(['no hearts', 'one heart', 'many hearts']);
    expect(texts('[Low, Medium, High]', scale(0, 100))).toEqual(['Low', 'Medium', 'High']);
    expect(values('[Low, Medium, High]', scale(0, 100))).toEqual([0, 50, 100]);
  });

  it('reads stop names, and falls back to formatValue without a template', () => {
    const stops = scale(0, 3, 1, { stops: ['Off', 'Low', 'Mid', 'High'] });
    expect(texts('every 2', stops)).toEqual(['Off', 'Mid']);
    expect(texts('ends | {stop} ({v})', stops)).toEqual(['Off (0)', 'High (3)']);
    expect(texts('every 50', scale(0, 100, 1, { formatValue: (v) => `${v} pts` }))).toEqual(['0 pts', '50 pts', '100 pts']);
  });
});

describe('label rules: mistakes', () => {
  it.each([
    ['every', 'neither a placement nor a value'],
    ['every 0', 'every takes a number above 0'],
    ['count 1', 'count takes a whole number of 2 or more'],
    ['evry 5 | {v}', 'neither a placement nor a value'],
    ['ends | {x}', 'is not a placeholder'],
    ['ends | {v', 'has no }'],
    ['ends | v}', 'has no {'],
    ['ends | {v:abc}', 'is not a number format'],
    ['ends | {a|b|c|d}', 'has 4 forms'],
    ['ends | [Low, High', 'closes with ]'],
    ['ends | a | b', 'one |'],
    ['every 0.0001', 'more than 500'],
    ['every 5 +', 'nothing on one side'],
  ])('"%s" gives an error and no labels', (rule, message) => {
    const { points, error } = ruleLabels(rule, scale(0, 100));
    expect(points).toEqual([]);
    expect(error).toContain(message);
  });

  it('warns once in development and draws no labels, without throwing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(noop);
    expect(resolveSliderLabels('every banana', scale(0, 100))).toEqual([]);
    expect(resolveSliderLabels('every banana', scale(0, 100))).toEqual([]);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]?.[0])).toContain('every banana');
  });
});

describe('labels from pairs and functions', () => {
  it('sorts pairs, keeps nodes, and drops pairs outside the range', () => {
    const points = resolveSliderLabels([[100, 'Full'], [0, 'Off'], [150, 'Too far']], scale(0, 100));
    expect(points.map((point) => point.label)).toEqual(['Off', 'Full']);
  });

  it('calls a function on every step and keeps what it returns', () => {
    const points = resolveSliderLabels((v) => (v % 50 === 0 ? `${v}°` : null), scale(0, 100, 10));
    expect(points.map((point) => point.label)).toEqual(['0°', '50°', '100°']);
  });

  it('labels every stop when there are stops and no labels', () => {
    const points = resolveSliderLabels(undefined, scale(0, 2, 1, { stops: ['A', 'B', 'C'] }));
    expect(points.map((point) => point.label)).toEqual(['A', 'B', 'C']);
  });
});

describe('fitLabels', () => {
  const boxes = (count, width, pitch) => Array.from({ length: count }, (_, index) => ({ start: index * pitch, end: index * pitch + width }));

  it('keeps every label that fits', () => {
    expect(fitLabels(boxes(5, 10, 20), 4)).toEqual([true, true, true, true, true]);
  });

  it('thins to every other label, always keeping both ends', () => {
    expect(fitLabels(boxes(5, 30, 20), 4)).toEqual([true, false, true, false, true]);
    expect(fitLabels(boxes(6, 30, 20), 4)).toEqual([true, false, true, false, false, true]);
  });

  it('shows only the first label when even the ends collide', () => {
    expect(fitLabels(boxes(2, 30, 10), 4)).toEqual([true, false]);
  });
});

describe('Slider', () => {
  it('draws one thumb by default and two in range mode, with labels and a readout', () => {
    const single = renderToString(h(Slider, { value: 40, onChange: noop, labels: 'every 50 | {v}%' }));
    expect(single.match(/type="range"/g)).toHaveLength(1);
    expect(single).toContain('slider__mark-text');
    expect(single).toContain('50%');
    const range = renderToString(h(Slider, { range: true, value: [1, 3], stops: ['A', 'B', 'C', 'D'], onChange: noop, 'aria-label': 'Pool' }));
    expect(range.match(/type="range"/g)).toHaveLength(2);
    expect(range).toContain('slider--range');
    expect(range).toContain('aria-label="Pool start"');
    expect(range).toContain('aria-valuetext="D"');
  });

  it('runs on its own from defaultValue and takes a form name', () => {
    const html = renderToString(h(Slider, { defaultValue: 30, name: 'volume', size: 'sm' }));
    expect(html).toContain('name="volume"');
    expect(html).toContain('value="30"');
    expect(html).toContain('control-size--sm');
  });
});

describe('a press on the bare track in range mode', () => {
  it('picks the nearer thumb, and the side pressed when both thumbs sit on one value', () => {
    expect(nearestThumb(10, 20, 60)).toBe('low');
    expect(nearestThumb(70, 20, 60)).toBe('high');
    expect(nearestThumb(30, 20, 60)).toBe('low');
    expect(nearestThumb(55, 20, 60)).toBe('high');
    expect(nearestThumb(40, 50, 50)).toBe('low');
    expect(nearestThumb(60, 50, 50)).toBe('high');
  });

  it('reads the press between the thumb centres and snaps it to a step', () => {
    const rect = { left: 100, width: 216, height: 16 };
    expect(trackFraction(108, rect)).toBe(0);
    expect(trackFraction(208, rect)).toBe(0.5);
    expect(trackFraction(400, rect)).toBe(1);
    expect(snapValue(37, scale(0, 100, 5))).toBe(35);
    expect(snapValue(0.234, scale(0, 1, 0.1))).toBe(0.2);
  });
});
