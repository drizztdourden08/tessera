/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { applyVolumeLevel } from '../src/composites/VolumeControl/behavior/apply-volume-level';
import { nudgeVolume } from '../src/composites/VolumeControl/behavior/nudge-volume';

describe('K1 VolumeControl in a popover', { tags: ['critical'] }, () => {
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
