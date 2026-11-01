/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { navProps } from '../src/composites/Wizard/Wizard/behavior/nav-props';
import { stepperSteps } from '../src/composites/Wizard/Wizard/behavior/stepper-steps';
import { wizardView } from '../src/composites/Wizard/wizard-view';
import { initialWizardState } from '../src/composites/Wizard/initial-wizard-state';
import { stepStatus } from '../src/primitives/Stepper/behavior/step-status';
import { waveOf } from '../src/primitives/Stepper/behavior/wave-of';

const noop = () => undefined;
const count = (html, needle) => html.split(needle).length - 1;

describe('K1 stepStatus', { tags: ['critical'] }, () => {
  it('marks steps before the current one done, and a step with a problem as an error', () => {
    expect([0, 1, 2].map((index) => stepStatus({ id: 's', label: 'S' }, index, 1))).toEqual(['done', 'current', 'upcoming']);
    expect(stepStatus({ id: 's', label: 'S', error: true }, 0, 1)).toBe('error');
    expect(stepStatus({ id: 's', label: 'S', error: true }, 2, 1)).toBe('upcoming');
  });
});

describe('K1 waveOf', { tags: ['critical'] }, () => {
  it('numbers the steps a move passes, from the step it left', () => {
    const motion = { from: 1, direction: 'forward' };
    expect([0, 1, 2, 3, 4].map((index) => waveOf(index, 3, motion))).toEqual([undefined, 0, 1, 2, undefined]);
    expect(waveOf(2, 1, { from: 3, direction: 'back' })).toBe(1);
  });
});

describe('K1 the step definition', { tags: ['critical'] }, () => {
  const steps = [
    { id: 'basics', label: 'Basics', summary: (v) => v.name },
    { id: 'options', label: 'Options', subSteps: (v) => [{ id: 'items', label: 'Items', count: v.changed }] },
    { id: 'review', label: 'Review', busyHint: (v) => `Creating ${v.name}...`, buttons: { next: { label: 'Create profile' } }, extra: () => 'extra' },
  ];
  const wizard = (currentId) => ({
    steps, current: steps.find((step) => step.id === currentId), values: { name: 'Mira', changed: 2 }, visited: ['basics', 'options', 'review'],
    errors: { basics: 'Name taken.' }, isFirst: false, isLast: currentId === 'review', invalid: null, hint: null, busy: false,
    goBack: noop, goNext: noop, finish: async () => undefined,
  });

  it('feeds the Stepper its summaries, sub-steps and errors', () => {
    expect(stepperSteps(wizard('review'))).toEqual([
      { id: 'basics', label: 'Basics', summary: 'Mira', subSteps: undefined, error: true },
      { id: 'options', label: 'Options', summary: undefined, subSteps: [{ id: 'items', label: 'Items', count: 2 }], error: false },
      { id: 'review', label: 'Review', summary: undefined, subSteps: undefined, error: false },
    ]);
  });

  it('feeds the nav its buttons, busy text and extra', () => {
    expect(navProps(wizard('review'), noop)).toMatchObject({ isLast: true, busyHint: 'Creating Mira...', buttons: { next: { label: 'Create profile' } }, extra: 'extra' });
  });
});

describe('K1 the hint', { tags: ['critical'] }, () => {
  const stateAt = (currentId, values) => initialWizardState(values, currentId);

  it('gives the step its own hint once it is valid', () => {
    const steps = [
      { id: 'basics', label: 'Basics', hint: 'Names can change later.', validate: (v) => (v.name === '' ? 'Name the profile.' : null) },
      { id: 'mode', label: 'Mode', hint: (v) => `Playing ${v.mode}.` },
    ];
    expect(wizardView(steps, stateAt('basics', { name: 'Mira', mode: 'local' })).hint).toBe('Names can change later.');
    expect(wizardView(steps, stateAt('basics', { name: '', mode: 'local' })).hint).toBe('Name the profile.');
    expect(wizardView(steps, stateAt('mode', { name: 'Mira', mode: 'local' })).hint).toBe('Playing local.');
  });
});
