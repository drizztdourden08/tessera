/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { navProps } from '../src/composites/Wizard/Wizard/behavior/nav-props';
import { stepperSteps } from '../src/composites/Wizard/Wizard/behavior/stepper-steps';
import { WizardNav } from '../src/composites/Wizard/WizardNav';
import { wizardView } from '../src/composites/Wizard/wizard-view';
import { initialWizardState } from '../src/composites/Wizard/initial-wizard-state';
import { WizardReview } from '../src/composites/Wizard/WizardReview';
import { WizardStep } from '../src/composites/Wizard/WizardStep';
import { Stepper } from '../src/primitives/Stepper';
import { stepStatus } from '../src/primitives/Stepper/behavior/step-status';
import { waveOf } from '../src/primitives/Stepper/behavior/wave-of';
import { TesseraProvider } from '../src/primitives/TesseraProvider';

const STEPS = [
  { id: 'basics', label: 'Basics', summary: 'Speedrun seed' },
  { id: 'mode', label: 'Mode', summary: 'Randomizer, on this PC' },
  { id: 'options', label: 'Randomizer options', subSteps: [{ id: 'items', label: 'Items', count: 3 }, { id: 'goal', label: 'Goal', count: 0 }] },
  { id: 'review', label: 'Review' },
];
const noop = () => undefined;
const count = (html, needle) => html.split(needle).length - 1;

describe('stepStatus', () => {
  it('marks steps before the current one done, and a step with a problem as an error', () => {
    expect([0, 1, 2].map((index) => stepStatus({ id: 's', label: 'S' }, index, 1))).toEqual(['done', 'current', 'upcoming']);
    expect(stepStatus({ id: 's', label: 'S', error: true }, 0, 1)).toBe('error');
    expect(stepStatus({ id: 's', label: 'S', error: true }, 2, 1)).toBe('upcoming');
  });
});

describe('waveOf', () => {
  it('numbers the steps a move passes, from the step it left', () => {
    const motion = { from: 1, direction: 'forward' };
    expect([0, 1, 2, 3, 4].map((index) => waveOf(index, 3, motion))).toEqual([undefined, 0, 1, 2, undefined]);
    expect(waveOf(2, 1, { from: 3, direction: 'back' })).toBe(1);
  });
});

describe('Stepper', () => {
  it('draws a numbered circle per step in a list, with the current step marked', () => {
    const html = renderToString(h(Stepper, { steps: STEPS, currentId: 'mode' }));
    expect(html).toContain('<nav');
    expect(html).toContain('<ol');
    expect(count(html, ' stepper-dot"')).toBe(4);
    expect(count(html, 'aria-current="step"')).toBe(1);
    expect(html).toContain('data-status="done"');
    expect(count(html, 'stepper__line')).toBe(3);
    expect(html).toContain('aria-label="Step 1, Basics, done"');
  });

  it('enables only the steps canSelect allows', () => {
    const html = renderToString(h(Stepper, { steps: STEPS, currentId: 'mode', canSelect: (id) => id === 'basics', onSelect: noop }));
    expect(count(html, 'class="pressable stepper__step"')).toBe(4);
    expect(count(html, 'disabled=""')).toBe(5);
  });

  it('shows summaries and sub-steps with counts in both orientations', () => {
    for (const orientation of ['horizontal', 'vertical']) {
      const html = renderToString(h(Stepper, { steps: STEPS, currentId: 'options', orientation, activeSubStepId: 'items', onSubStepSelect: noop }));
      expect(html).toContain('Randomizer, on this PC');
      expect(html).toContain('aria-label="Randomizer options sections"');
      expect(html).toContain('aria-label="3 changed"');
      expect(html).not.toContain('aria-label="0 changed"');
      expect(count(html, 'aria-current="true"')).toBe(1);
    }
  });

  it('names a step with a problem', () => {
    const html = renderToString(h(Stepper, { steps: [{ ...STEPS[0], error: true }, ...STEPS.slice(1)], currentId: 'mode' }));
    expect(html).toContain('data-status="error"');
    expect(html).toContain('aria-label="Step 1, Basics, needs attention"');
  });

  it('has a compact form with the position and a progress bar', () => {
    const html = renderToString(h(Stepper, { steps: STEPS, currentId: 'options', compact: true }));
    expect(html).toContain('Step 3 of 4');
    expect(html).toContain('role="progressbar"');
    expect(html).toContain('aria-valuenow="3"');
  });
});

describe('WizardStep', () => {
  it('puts the error in an alert above the fields', () => {
    const html = renderToString(h(WizardStep, { title: 'Review', error: 'Seed generation failed' }, h('p', null, 'fields')));
    expect(html).toContain('role="alert"');
    expect(html.indexOf('Seed generation failed')).toBeLessThan(html.indexOf('fields'));
    expect(html).toContain('tabindex="-1"');
  });

  it('draws no alert without an error', () => {
    expect(renderToString(h(WizardStep, { title: 'Basics', error: null }))).not.toContain('role="alert"');
  });
});

describe('WizardNav', () => {
  const base = { isFirst: false, isLast: false, canGoNext: true, onBack: noop, onNext: noop, onFinish: noop, onCancel: noop };

  it('generates Back and Next with arrows, or the finish button on the last step', () => {
    const html = renderToString(h(WizardNav, base));
    expect(html).toContain('>Next<');
    expect(html).toContain('>Back<');
    expect(count(html, 'wizard-nav__icon')).toBe(2);
    expect(html).toContain('button-row--bar');
    const last = renderToString(h(WizardNav, { ...base, isLast: true }));
    expect(last).toContain('>Finish<');
    expect(last).not.toContain('>Next<');
  });

  it('takes a label and an icon from the step, each on its own', () => {
    const label = renderToString(h(WizardNav, { ...base, isLast: true, buttons: { next: { label: 'Create profile' } } }));
    expect(label).toContain('>Create profile<');
    expect(count(label, 'wizard-nav__icon')).toBe(2);
    const bare = renderToString(h(WizardNav, { ...base, buttons: { next: { icon: null } } }));
    expect(bare).toContain('>Next<');
    expect(count(bare, 'wizard-nav__icon')).toBe(1);
    const fewer = renderToString(h(WizardNav, { ...base, buttons: { back: false, cancel: false } }));
    expect(fewer).not.toContain('>Back<');
    expect(fewer).not.toContain('>Cancel<');
  });

  it('turns the finish button busy and holds the rest while busy', () => {
    const html = renderToString(h(WizardNav, { ...base, isLast: true, busy: true }));
    expect(html).toContain('aria-busy="true"');
    expect(count(html, 'disabled=""')).toBe(3);
  });

  it('shows the hint it is given', () => {
    expect(renderToString(h(WizardNav, { ...base, canGoNext: false, hint: 'Name the profile.' }))).toContain('Name the profile.');
  });

  it('shows the busy text in place of the hint while finishing', () => {
    const html = renderToString(h(WizardNav, { ...base, isLast: true, busy: true, canGoNext: false, hint: 'Name the profile.', busyHint: 'Generating seed...' }));
    expect(html).toContain('Generating seed...');
    expect(html).not.toContain('Name the profile.');
    expect(renderToString(h(WizardNav, { ...base, isLast: true, busy: true }))).toContain('Finishing...');
  });

  it('takes its wording from the string table', () => {
    const html = renderToString(h(TesseraProvider, { overrides: { strings: { wizard: { next: 'Suivant' } } } }, h(WizardNav, base)));
    expect(html).toContain('Suivant');
  });
});

describe('the step definition', () => {
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

describe('the hint', () => {
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

describe('WizardReview', () => {
  it('lists each step with an Edit button and rich values', () => {
    const html = renderToString(h(WizardReview, {
      onEdit: noop,
      sections: [
        { stepId: 'basics', title: 'Basics', rows: [{ term: 'Name', detail: 'Speedrun seed' }] },
        { stepId: 'seed', title: 'Seed', rows: [{ term: 'Seed', detail: h('code', null, '3fa9c1') }] },
      ],
    }));
    expect(html).toContain('aria-label="Edit Basics"');
    expect(html).toContain('<code>3fa9c1</code>');
  });
});
