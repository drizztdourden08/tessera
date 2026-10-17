/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { VolumeControl } from '../src/composites/VolumeControl';
import { applyVolumeLevel } from '../src/composites/VolumeControl/behavior/apply-volume-level';
import { nudgeVolume } from '../src/composites/VolumeControl/behavior/nudge-volume';
import { VOLUME_KEY_DIRECTIONS } from '../src/composites/VolumeControl/VolumeControl.constants';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const noop = () => undefined;

describe('VolumeControl in a popover', () => {
  it('draws only the icon button until hover or keyboard focus opens the slider', () => {
    const html = renderToString(h(VolumeControl, { slider: 'popover', value: 60, onChange: noop }));
    expect(html).toContain('volume-control--popover');
    expect(html).toContain('class="volume-control__popover"');
    expect(html).toContain('aria-label="Mute"');
    expect(html).not.toContain('type="range"');
    expect(html).not.toContain('volume-control__panel');
  });

  it('keeps the slider beside the button by default', () => {
    const html = renderToString(h(VolumeControl, { value: 60, onChange: noop }));
    expect(html).toContain('volume-control--inline');
    expect(html.match(/type="range"/g)).toHaveLength(1);
  });

  it('opens and closes as a hint does, with the shared Anchored popup, and turns the wheel and arrow keys into nudges', () => {
    const popover = read('src/composites/VolumeControl/sub-components/VolumePopover.tsx');
    expect(popover).toContain('useTooltipOpen(anchorRef, panelRef, active)');
    expect(popover).toContain('<Anchored');
    expect(popover).toContain('<Slider {...slider} orientation={orientation} size="sm" showValue />');
    expect(popover).toContain('data-app-region="no-drag"');
    expect(VOLUME_KEY_DIRECTIONS).toEqual({ ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 });
    expect(read('src/composites/VolumeControl/VolumeControl.css')).toMatch(/\.volume-control__panel \{\s+padding: var\(--space-xs\);/);
  });

  it('nudges by a twentieth of the range, kept on the step and inside the range', () => {
    expect(nudgeVolume(60, 1, { min: 0, max: 100, step: 1 })).toBe(65);
    expect(nudgeVolume(3, -1, { min: 0, max: 100, step: 1 })).toBe(0);
    expect(nudgeVolume(98, 1, { min: 0, max: 100, step: 1 })).toBe(100);
    expect(nudgeVolume(0.5, 1, { min: 0, max: 1, step: 0.05 })).toBe(0.55);
    expect(nudgeVolume(40, 1, { min: 0, max: 100, step: 10 })).toBe(50);
  });

  it('unmutes when a muted level is raised, and only then', () => {
    const onChange = vi.fn();
    const onMutedChange = vi.fn();
    applyVolumeLevel({ value: 0, onChange, muted: true, onMutedChange }, 30);
    expect(onMutedChange).toHaveBeenCalledWith(false);
    expect(onChange).toHaveBeenCalledWith(30);
    applyVolumeLevel({ value: 0, onChange, muted: true, onMutedChange }, 0);
    applyVolumeLevel({ value: 40, onChange, muted: false, onMutedChange }, 50);
    expect(onMutedChange).toHaveBeenCalledTimes(1);
  });
});
