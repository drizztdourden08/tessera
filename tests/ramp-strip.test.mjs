/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { nextRampStep } from '../src/composites/RampStrip/behavior/next-ramp-step';
import { rampTabStop } from '../src/composites/RampStrip/behavior/ramp-tab-stop';
import { stepContextProps } from '../src/composites/RampStrip/behavior/step-context-props';
import { stepCaption } from '../src/composites/RampStrip/behavior/step-caption';
import { stepLabel } from '../src/composites/RampStrip/behavior/step-label';

const steps = [{ color: '#111111' }, { color: '#555555', disabled: true }, { color: '#999999' }, { color: '#dddddd' }];

describe('K1 stepCaption', { tags: ['critical'] }, () => {
  it('prefers the own caption, then the place in the ramp, then nothing', () => {
    expect(stepCaption({ color: '#111111', caption: 'Base' }, 0, true)).toBe('Base');
    expect(stepCaption({ color: '#111111' }, 0, true)).toBe('1');
    expect(stepCaption({ color: '#111111' }, 6, true)).toBe('7');
    expect(stepCaption({ color: '#111111' }, 0, false)).toBeUndefined();
  });
});

describe('K1 stepLabel', { tags: ['critical'] }, () => {
  it('names a step by its label, or its colour', () => {
    expect(stepLabel({ color: '#111111', label: 'Shade' })).toBe('Shade');
    expect(stepLabel({ color: '#111111' })).toBe('#111111');
  });
});

describe('K1 nextRampStep', { tags: ['critical'] }, () => {
  it('moves along the ramp, skips disabled steps and wraps', () => {
    expect(nextRampStep('ArrowRight', 0, steps)).toBe(2);
    expect(nextRampStep('ArrowLeft', 2, steps)).toBe(0);
    expect(nextRampStep('ArrowRight', 3, steps)).toBe(0);
    expect(nextRampStep('ArrowLeft', 0, steps)).toBe(3);
  });

  it('jumps to the first and last open step, and ignores other keys', () => {
    expect(nextRampStep('Home', 3, steps)).toBe(0);
    expect(nextRampStep('End', 0, steps)).toBe(3);
    expect(nextRampStep('ArrowDown', 0, steps)).toBeNull();
    expect(nextRampStep('ArrowRight', 0, [{ color: '#111111', disabled: true }])).toBeNull();
  });
});

describe('K1 rampTabStop', { tags: ['critical'] }, () => {
  it('lands on the focused step, else the picked one, else the first open one', () => {
    expect(rampTabStop(steps, 3, 2)).toBe(2);
    expect(rampTabStop(steps, 3, null)).toBe(3);
    expect(rampTabStop(steps, 1, null)).toBe(0);
    expect(rampTabStop(steps, null, 1)).toBe(0);
    expect(rampTabStop([{ color: '#111111', disabled: true }], null, null)).toBeNull();
  });
});

const menuKey = () => {
  const event = { key: 'ContextMenu', shiftKey: false, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
  return event;
};

describe('K1 stepContextProps', { tags: ['critical'] }, () => {
  it('adds nothing without a handler', () => {
    expect(stepContextProps(undefined, false)).toEqual({});
  });

  it('forwards the menu key, and stops the native menu only when there is no swatchMenu', () => {
    const seen = [];
    const bare = stepContextProps((event) => seen.push(event), false);
    const bareKey = menuKey();
    bare.onKeyDown(bareKey);
    expect(seen).toEqual([bareKey]);
    expect(bareKey.defaultPrevented).toBe(true);

    const withMenu = stepContextProps((event) => seen.push(event), true);
    const menuEvent = menuKey();
    withMenu.onKeyDown(menuEvent);
    expect(seen).toHaveLength(2);
    expect(menuEvent.defaultPrevented).toBe(false);
  });

  it('ignores other keys', () => {
    const seen = [];
    stepContextProps((event) => seen.push(event), false).onKeyDown({ key: 'a', shiftKey: false });
    expect(seen).toEqual([]);
  });
});
