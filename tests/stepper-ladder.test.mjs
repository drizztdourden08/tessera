/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { lineLit } from '../src/primitives/Stepper/behavior/line-lit';
import { rootStyle } from '../src/primitives/Stepper/behavior/root-style';
import { stepStatus } from '../src/primitives/Stepper/behavior/step-status';
import { STEPPER_MEDIA_SIZES, STEPPER_SIZES, STEPPER_STEP_WIDTHS } from '../src/primitives/Stepper/behavior/stepper-sizes.constants';
import { STEPPER_TONES } from '../src/primitives/Stepper/behavior/stepper-tones.constants';

const STEPS = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }, { id: 'c', label: 'C' }, { id: 'd', label: 'D' }];
const withStates = (...states) => STEPS.map((step, index) => ({ ...step, state: states[index] }));

describe('K1 Stepper step status', { tags: ['critical'] }, () => {
  it('lets an explicit state win over the position of the step', () => {
    expect(stepStatus({ id: 'a', label: 'A', state: 'upcoming' }, 0, 3)).toBe('upcoming');
    expect(stepStatus({ id: 'a', label: 'A', state: 'done' }, 3, 0)).toBe('done');
    expect(stepStatus({ id: 'a', label: 'A', state: 'current' }, 0, 3)).toBe('current');
  });

  it('lets an explicit state win over the error flag', () => {
    expect(stepStatus({ id: 'a', label: 'A', error: true, state: 'done' }, 0, 0)).toBe('done');
  });

  it('keeps following the position when no state is given', () => {
    expect(stepStatus(STEPS[0], 0, 2)).toBe('done');
    expect(stepStatus(STEPS[2], 2, 2)).toBe('current');
    expect(stepStatus(STEPS[3], 3, 2)).toBe('upcoming');
    expect(stepStatus({ id: 'a', label: 'A', error: true }, 1, 1)).toBe('error');
  });
});

describe('K1 Stepper line lit', { tags: ['critical'] }, () => {
  it('follows the own status of the step when the next step has no state', () => {
    const next = { id: 'n', label: 'N' };
    expect(lineLit('done', next, 'upcoming')).toBe(true);
    expect(lineLit('error', next, 'upcoming')).toBe(true);
    expect(lineLit('current', next, 'upcoming')).toBe(false);
    expect(lineLit('upcoming', next, 'upcoming')).toBe(false);
    expect(lineLit('done', undefined, undefined)).toBe(true);
  });

  it('follows the status of the next step when that step has a state', () => {
    const next = { id: 'n', label: 'N', state: 'done' };
    expect(lineLit('upcoming', next, 'done')).toBe(true);
    expect(lineLit('upcoming', next, 'current')).toBe(true);
    expect(lineLit('done', next, 'upcoming')).toBe(false);
  });

  it('lights the lines around a skipped step the way the ladder reads', () => {
    const steps = withStates('done', 'upcoming', 'done', 'done');
    const statuses = steps.map((step, index) => stepStatus(step, index, -1));
    expect(statuses).toEqual(['done', 'upcoming', 'done', 'done']);
    const lit = [0, 1, 2].map((index) => lineLit(statuses[index], steps[index + 1], statuses[index + 1]));
    expect(lit).toEqual([false, true, true]);
  });
});

describe('K1 Stepper root style', { tags: ['critical'] }, () => {
  it('maps step width, media size and label lines to custom properties', () => {
    expect(rootStyle({ stepWidth: 'lg', mediaSize: 'sm', labelLines: 2 })).toEqual({
      '--stepper-step-w': STEPPER_STEP_WIDTHS.lg,
      '--stepper-media-h': STEPPER_MEDIA_SIZES.sm,
      '--stepper-label-lines': 2,
    });
    expect(STEPPER_STEP_WIDTHS.lg).toBe('var(--size-128)');
    expect(STEPPER_MEDIA_SIZES.sm).toBe('var(--size-24)');
  });

  it('returns nothing when nothing is set', () => {
    expect(rootStyle({})).toBeUndefined();
  });

  it('offers a neutral tone', () => {
    expect(STEPPER_TONES.neutral).toBeDefined();
    expect(rootStyle({ tone: 'neutral' })).toEqual({ '--stepper-tone': STEPPER_TONES.neutral.tone, '--stepper-on-tone': STEPPER_TONES.neutral.on });
  });
});

describe('K1 Stepper media below, hidden labels and size', { tags: ['critical'] }, () => {
  it('maps the size to dot, digit and gap custom properties', () => {
    expect(rootStyle({ size: 'sm' })).toEqual({
      '--stepper-dot': STEPPER_SIZES.sm.dot,
      '--stepper-digit': STEPPER_SIZES.sm.digit,
      '--stepper-gap': STEPPER_SIZES.sm.gap,
      '--stepper-gap-min': STEPPER_SIZES.sm.gapMin,
    });
    expect(STEPPER_SIZES.sm.dot).toBe('var(--size-24)');
    expect(STEPPER_SIZES.sm.digit).toBe('var(--text-xs)');
    expect(STEPPER_SIZES.md.digit).toBe('var(--text-base)');
  });
});
