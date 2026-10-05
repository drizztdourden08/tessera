/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { VolumeControl } from '../src/composites/VolumeControl';
import { volumeIconName } from '../src/composites/VolumeControl/behavior/volume-icon-name';
import { Slider } from '../src/primitives/Slider';
import { grabThumb } from '../src/primitives/Slider/behavior/grab-thumb';
import { nearestThumb } from '../src/primitives/Slider/behavior/nearest-thumb';
import { railPoint } from '../src/primitives/Slider/behavior/rail-point';
import { readoutChars } from '../src/primitives/Slider/behavior/readout-chars';
import { snapValue } from '../src/primitives/Slider/behavior/snap-value';
import { trackFraction } from '../src/primitives/Slider/behavior/track-fraction';

const scale = (min, max, step = 1, extra = {}) => ({ min, max, step, ...extra });
const noop = () => undefined;

describe('Slider', () => {
  it('draws one thumb by default and two in range mode, with labels and a readout', () => {
    const single = renderToString(h(Slider, { value: 40, onChange: noop, labels: 'every 50 | {v}%' }));
    expect(single.match(/type="range"/g)).toHaveLength(1);
    expect(single).toContain('scale-labels__text');
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

describe('dragging a range thumb', () => {
  it('grabs the thumb under the pointer, both when they sit together, and nothing on the bare track', () => {
    expect(grabThumb(21, 20, 60, 2)).toBe('low');
    expect(grabThumb(59, 20, 60, 2)).toBe('high');
    expect(grabThumb(40, 20, 60, 2)).toBeNull();
    expect(grabThumb(50.5, 50, 50, 2)).toBe('both');
    expect(grabThumb(50.8, 50, 52, 2)).toBe('low');
  });

  it('turns a pointer x into a value and the thumb reach in value units', () => {
    expect(railPoint(208, { left: 100, width: 216, height: 16 }, scale(0, 100))).toEqual({ at: 50, reach: 4 });
  });
});

describe('the readout width', () => {
  it('counts the longest value, or both ends and the dash in range mode', () => {
    expect(readoutChars(scale(0, 100), false)).toBe(3);
    expect(readoutChars(scale(0, 100, 1, { formatValue: (v) => `${v}%` }), true)).toBe(9);
    expect(readoutChars(scale(-5, 5, 0.5), false)).toBe(4);
    expect(readoutChars(scale(0, 2, 1, { stops: ['Off', 'Medium', 'On'] }), false)).toBe(6);
  });

  it('reserves the width on the track', () => {
    expect(renderToString(h(Slider, { value: 5, max: 1000 }))).toContain('--slider-readout:4ch');
  });
});

describe('VolumeControl', () => {
  it('draws a mute button beside a slider, with the icon from the level', () => {
    const html = renderToString(h(VolumeControl, { value: 0, onChange: noop, label: 'Music' }));
    expect(html).toContain('aria-label="Unmute"');
    expect(html).toContain('aria-label="Music"');
    expect(volumeIconName(0, 0, 100, false)).toBe('volume-x');
    expect(volumeIconName(30, 0, 100, false)).toBe('volume-1');
    expect(volumeIconName(80, 0, 100, false)).toBe('volume-2');
    expect(volumeIconName(80, 0, 100, true)).toBe('volume-x');
  });
});

describe('Slider scale labels at the ends', () => {
  const css = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

  it('starts the first label at the start of the track and ends the last at its end, with no reach past them', () => {
    const scale = css('../src/primitives/ScaleLabels/ScaleLabels.css');
    expect(scale).toMatch(/\.scale-labels--horizontal \.scale-labels__mark--start \.scale-labels__text \{\s+transform: none;/);
    expect(scale).toMatch(/\.scale-labels--horizontal \.scale-labels__mark--end \.scale-labels__text \{\s+transform: translateX\(-100%\);/);
    expect(scale).not.toContain('overhang');
    expect(css('../src/primitives/Slider/Slider.css')).not.toContain('overhang');
  });
});
