/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WizardNav } from '../src/composites/Wizard/WizardNav';
import { WizardProgress } from '../src/composites/Wizard/WizardProgress';
import { stepState } from '../src/composites/Wizard/WizardProgress/behavior/step-state';
import { WizardReview } from '../src/composites/Wizard/WizardReview';
import { WizardStep } from '../src/composites/Wizard/WizardStep';
import { TesseraProvider } from '../src/primitives/TesseraProvider';

const STEPS = [
  { id: 'basics', label: 'Basics', summary: 'Speedrun seed' },
  { id: 'mode', label: 'Mode', summary: 'Randomizer, on this PC' },
  { id: 'options', label: 'Randomizer options', subSteps: [{ id: 'items', label: 'Items', count: 3 }, { id: 'goal', label: 'Goal', count: 0 }] },
  { id: 'review', label: 'Review' },
];
const noop = () => undefined;
const count = (html, needle) => html.split(needle).length - 1;

describe('stepState', () => {
  it('marks steps before the current one done', () => {
    expect([0, 1, 2].map((index) => stepState(index, 1))).toEqual(['done', 'current', 'upcoming']);
  });
});

describe('WizardProgress', () => {
  it('draws a numbered circle per step with the current step marked', () => {
    const html = renderToString(h(WizardProgress, { steps: STEPS, currentId: 'mode' }));
    expect(count(html, ' wizard-dot"')).toBe(4);
    expect(count(html, 'aria-current="step"')).toBe(1);
    expect(html).toContain('data-state="done"');
    expect(count(html, 'wizard-progress__link')).toBe(3);
    expect(html).toContain('aria-label="Step 1, Basics, done"');
  });

  it('enables only the steps canSelect allows', () => {
    const html = renderToString(h(WizardProgress, { steps: STEPS, currentId: 'mode', canSelect: (id) => id === 'basics', onSelect: noop }));
    expect(count(html, '<button')).toBe(4);
    expect(count(html, 'disabled=""')).toBe(3);
  });

  it('shows summaries and sub-steps with counts only when vertical', () => {
    const flat = renderToString(h(WizardProgress, { steps: STEPS, currentId: 'options' }));
    expect(flat).not.toContain('wizard-sub-steps');
    const tall = renderToString(h(WizardProgress, {
      steps: STEPS, currentId: 'options', orientation: 'vertical', activeSubStepId: 'items', onSubStepSelect: noop,
    }));
    expect(tall).toContain('Randomizer, on this PC');
    expect(tall).toContain('aria-label="Randomizer options sections"');
    expect(tall).toContain('aria-label="3 changed"');
    expect(tall).not.toContain('aria-label="0 changed"');
    expect(count(tall, 'aria-current="true"')).toBe(1);
  });

  it('has a compact form with the position and a progress bar', () => {
    const html = renderToString(h(WizardProgress, { steps: STEPS, currentId: 'options', compact: true }));
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

  it('shows Next, or the finish button on the last step', () => {
    expect(renderToString(h(WizardNav, base))).toContain('Next');
    const last = renderToString(h(WizardNav, { ...base, isLast: true, finishLabel: 'Create profile' }));
    expect(last).toContain('Create profile');
    expect(last).not.toContain('>Next<');
  });

  it('turns the finish button busy and holds the rest while busy', () => {
    const html = renderToString(h(WizardNav, { ...base, isLast: true, busy: true }));
    expect(html).toContain('aria-busy="true"');
    expect(count(html, 'disabled=""')).toBe(3);
  });

  it('shows the hint only while Next is held', () => {
    expect(renderToString(h(WizardNav, { ...base, canGoNext: false, hint: 'Name the profile.' }))).toContain('Name the profile.');
    expect(renderToString(h(WizardNav, { ...base, hint: 'Name the profile.' }))).not.toContain('Name the profile.');
  });

  it('shows the busy text beside the spinner while finishing', () => {
    const html = renderToString(h(WizardNav, { ...base, isLast: true, busy: true, canGoNext: false, hint: 'Name the profile.', busyLabel: 'Generating seed...' }));
    expect(html).toContain('Generating seed...');
    expect(html).not.toContain('Name the profile.');
    expect(renderToString(h(WizardNav, { ...base, isLast: true, busy: true }))).toContain('Finishing...');
  });

  it('takes its wording from the string table', () => {
    const html = renderToString(h(TesseraProvider, { overrides: { strings: { wizard: { next: 'Suivant' } } } }, h(WizardNav, base)));
    expect(html).toContain('Suivant');
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
