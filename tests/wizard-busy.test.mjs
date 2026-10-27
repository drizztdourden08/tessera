/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { initialWizardState } from '../src/composites/Wizard/initial-wizard-state';
import { Wizard } from '../src/composites/Wizard/Wizard';
import { withBusy } from '../src/composites/Wizard/Wizard/behavior/with-busy';
import { wizardDialogClass } from '../src/composites/Wizard/WizardDialog/behavior/dialog-class';
import { wizardMoves } from '../src/composites/Wizard/wizard-moves';
import { wizardView } from '../src/composites/Wizard/wizard-view';

const STEPS = [
  { id: 'basics', label: 'Basics', busyHint: 'Checking the name...', validate: (v) => (v.name.trim() === '' ? 'Name the profile.' : null) },
  { id: 'mode', label: 'Mode' },
  { id: 'seed', label: 'Seed', when: (v) => v.mode !== 'standard', validate: (v) => (v.seed === '' ? 'Roll a seed.' : null) },
  { id: 'review', label: 'Review' },
];
const VALUES = { name: 'Speedrun seed', mode: 'local', seed: '3fa9c1' };
const ids = STEPS.map((step) => step.id);
const noop = () => undefined;
const count = (html, needle) => html.split(needle).length - 1;
const stateAt = (currentId, visited, values = VALUES) => ({ ...initialWizardState(values, currentId), visited });

describe('a forced goTo', () => {
  const movesAt = (currentId, visited, values = VALUES) => {
    const dispatch = vi.fn();
    const state = stateAt(currentId, visited, values);
    return {
      dispatch,
      moves: wizardMoves(wizardView(STEPS, state), dispatch),
      busyMoves: wizardMoves(wizardView(STEPS, { ...state, busy: true }), dispatch),
    };
  };

  it('reaches a step the guards refuse, only when asked', () => {
    const { dispatch, moves } = movesAt('basics', ['basics']);
    moves.goTo('review');
    moves.goTo('review', {});
    moves.goTo('review', { force: false });
    expect(dispatch).not.toHaveBeenCalled();
    moves.goTo('review', { force: true });
    expect(dispatch).toHaveBeenCalledWith({ type: 'go', id: 'review' });
  });

  it('passes an invalid step and a running finish', () => {
    const { dispatch, moves, busyMoves } = movesAt('basics', ['basics'], { ...VALUES, name: '' });
    moves.goTo('seed', { force: true });
    busyMoves.goTo('mode', { force: true });
    expect(dispatch.mock.calls.map(([action]) => action.id)).toEqual(['seed', 'mode']);
  });

  it('still ignores a step that does not exist or is hidden', () => {
    const { dispatch, moves } = movesAt('basics', ['basics'], { ...VALUES, mode: 'standard' });
    moves.goTo('missing', { force: true });
    moves.goTo('seed', { force: true });
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe('withBusy', () => {
  const api = () => {
    const calls = [];
    const note = (name) => (...args) => calls.push([name, ...args]);
    const wizard = {
      ...wizardView(STEPS, stateAt('mode', ids)),
      values: VALUES,
      visited: ids,
      errors: {},
      dirty: false,
      busy: false,
      goNext: note('next'),
      goBack: note('back'),
      goTo: note('to'),
      finish: () => Promise.resolve(calls.push(['finish'])),
    };
    return { calls, wizard };
  };

  it('returns the same wizard while the app is not busy', () => {
    const { wizard } = api();
    expect(withBusy(wizard, false)).toBe(wizard);
  });

  it('marks the wizard busy and turns every move off', async () => {
    const { calls, wizard } = api();
    const held = withBusy(wizard, true);
    expect(held.busy).toBe(true);
    expect(held.canGoTo('basics')).toBe(false);
    held.goNext();
    held.goBack();
    held.goTo('basics');
    held.goTo('basics', { force: false });
    await held.finish();
    expect(calls).toEqual([]);
  });

  it('lets only a forced goTo through', () => {
    const { calls, wizard } = api();
    withBusy(wizard, true).goTo('review', { force: true });
    expect(calls).toEqual([['to', 'review', { force: true }]]);
  });
});

describe('Wizard busy', () => {
  const view = wizardView(STEPS, { ...stateAt('basics', ids), values: { ...VALUES, mode: 'standard' } });
  const api = { ...view, values: VALUES, visited: ids, errors: {}, dirty: false, busy: false, goNext: noop, goBack: noop, goTo: noop, finish: () => Promise.resolve() };
  const render = (busy) => renderToString(h(Wizard, { wizard: api, busy, onExit: noop }));

  it('holds the buttons and the steps and shows the busy hint while the app works', () => {
    const idle = render(false);
    const busy = render(true);
    expect(idle).not.toContain('Checking the name...');
    expect(busy).toContain('Checking the name...');
    expect(busy).toContain('data-busy=""');
    expect(count(busy, 'disabled=""')).toBeGreaterThan(count(idle, 'disabled=""'));
  });
});

describe('wizardDialogClass', () => {
  it('names the size and keeps the caller class', () => {
    expect(wizardDialogClass('wide', '')).toBe('wizard-dialog wizard-dialog--wide');
    expect(wizardDialogClass('xl', 'mine')).toBe('wizard-dialog wizard-dialog--xl mine');
  });
});
