/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Stepper } from '../src/primitives/Stepper';
import { lineTone } from '../src/primitives/Stepper/behavior/line-tone';
import { motionKind } from '../src/primitives/Stepper/behavior/motion-kind';
import { waveOf } from '../src/primitives/Stepper/behavior/wave-of';

const STEPS = [{ id: 'a', label: 'A' }, { id: 'b', label: 'B', doneIcon: 'star' }, { id: 'c', label: 'C', tone: 'teal' }];

describe('Stepper motion', () => {
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

describe('Stepper done icon', () => {
  const html = (props) => renderToString(h(Stepper, { steps: STEPS, currentId: 'c', ...props }));

  it('gives every circle a card that flips to a check by default, or to the step icon', () => {
    expect(html().match(/data-flip/g)).toHaveLength(3);
    expect(html().match(/stepper-dot__icon/g)).toHaveLength(3);
  });

  it('keeps only the step icon when doneIcon is false', () => {
    expect(html({ doneIcon: false }).match(/stepper-dot__icon/g)).toHaveLength(1);
  });

  it('sets the step tone and the stepper tone as custom properties', () => {
    expect(html()).toContain('--stepper-step-tone:var(--c-tag-teal)');
    expect(html({ tone: 'success' })).toContain('--stepper-tone:var(--c-success)');
  });
});

describe('Stepper room', () => {
  const html = (props) => renderToString(h(Stepper, { steps: [{ id: 'a', label: 'A', summary: 'Chosen' }, ...STEPS.slice(1)], currentId: 'b', ...props }));

  it('keeps a summary line under every step by default, and only real summaries with reserve none', () => {
    expect(html().match(/stepper__summary/g)).toHaveLength(3);
    expect(html({ reserve: 'none' }).match(/stepper__summary/g)).toHaveLength(1);
  });

  it('gives every label a bold copy to size it', () => {
    expect(html().match(/data-label="[ABC]"/g)).toHaveLength(3);
  });
});
