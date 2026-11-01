/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { lineTone } from '../src/primitives/Stepper/behavior/line-tone';
import { motionKind } from '../src/primitives/Stepper/behavior/motion-kind';
import { waveOf } from '../src/primitives/Stepper/behavior/wave-of';

const STEPS = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B', doneIcon: 'star' }, { id: 'c', label: 'C', tone: 'teal' }];

describe('K1 Stepper motion', { tags: ['critical'] }, () => {
  it('names one step forward, a jump, and going back', () => {
    expect(motionKind({ from: 1, direction: 'forward' }, 2)).toBe('step');
    expect(motionKind({ from: 0, direction: 'forward' }, 5)).toBe('skip');
    expect(motionKind({ from: 5, direction: 'back' }, 0)).toBe('back');
    expect(motionKind({ from: 2, direction: 'still' }, 2)).toBe('still');
  });

  it('counts the wave from the step the motion leaves, both ways', () => {
    expect([0, 1, 2, 3].map((index) => waveOf(index, 3, { from: 1, direction: 'forward' }))).toEqual([undefined, 0, 1, 2]);
    expect([0, 1, 2, 3].map((index) => waveOf(index, 1, { from: 3, direction: 'back' }))).toEqual([undefined, 2, 1, 0]);
  });

  it('colours a line with the tone of the step it arrives at', () => {
    expect(lineTone(STEPS[1], STEPS[2], undefined)).toBe('teal');
    expect(lineTone(STEPS[0], STEPS[1], undefined)).toBeUndefined();
    expect(lineTone(STEPS[2], { id: 'd', label: 'D' }, 'info')).toBe('info');
  });
});
