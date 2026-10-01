/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { canReach } from '../src/composites/Wizard/can-reach';
import { currentIndex } from '../src/composites/Wizard/current-index';
import { finishWizard } from '../src/composites/Wizard/finish-wizard';
import { initialWizardState } from '../src/composites/Wizard/initial-wizard-state';
import { isDirty } from '../src/composites/Wizard/is-dirty';
import { settleFinish } from '../src/composites/Wizard/settle-finish';
import { useWizard } from '../src/composites/Wizard/useWizard';
import { visibleSteps } from '../src/composites/Wizard/visible-steps';
import { wizardMoves } from '../src/composites/Wizard/wizard-moves';
import { wizardReducer } from '../src/composites/Wizard/wizard-reducer';
import { wizardView } from '../src/composites/Wizard/wizard-view';

const STEPS = [
  { id: 'basics', label: 'Basics', validate: (v) => (v.name.trim() === '' ? 'Name the profile.' : null) },
  { id: 'mode', label: 'Mode' },
  { id: 'seed', label: 'Seed', when: (v) => v.mode !== 'standard', validate: (v) => (v.seed === '' ? 'Roll a seed.' : null) },
  { id: 'settings', label: 'Settings' },
  { id: 'review', label: 'Review' },
];
const VALUES = { name: 'Speedrun seed', mode: 'local', seed: '3fa9c1' };
const ids = (steps) => steps.map((step) => step.id);
const stateAt = (currentId, visited, values = VALUES) => ({ ...initialWizardState(values, currentId), visited });
const succeed = async () => ({ success: true, id: 'p-7' });

describe('visibleSteps', () => {
  it('drops a step whose when is false', () => {
    expect(ids(visibleSteps(STEPS, VALUES))).toEqual(['basics', 'mode', 'seed', 'settings', 'review']);
    expect(ids(visibleSteps(STEPS, { ...VALUES, mode: 'standard' }))).toEqual(['basics', 'mode', 'settings', 'review']);
  });
});

describe('currentIndex', () => {
  it('finds the current step, or the nearest shown step before a hidden one', () => {
    const shown = visibleSteps(STEPS, { ...VALUES, mode: 'standard' });
    expect(currentIndex(STEPS, shown, 'settings')).toBe(2);
    expect(currentIndex(STEPS, shown, 'seed')).toBe(1);
    expect(currentIndex(STEPS, shown, 'missing')).toBe(0);
  });
});

describe('canReach', () => {
  const shown = visibleSteps(STEPS, VALUES);
  it('always goes back, never to the current step', () => {
    expect(canReach(shown, 3, 'basics', { visited: [], values: VALUES })).toBe(true);
    expect(canReach(shown, 3, 'settings', { visited: [], values: VALUES })).toBe(false);
  });

  it('goes forward only over valid, visited steps', () => {
    const visited = ['basics', 'mode', 'seed', 'settings'];
    expect(canReach(shown, 0, 'mode', { visited: ['basics'], values: VALUES })).toBe(true);
    expect(canReach(shown, 0, 'settings', { visited: ['basics', 'mode'], values: VALUES })).toBe(false);
    expect(canReach(shown, 0, 'settings', { visited, values: VALUES })).toBe(true);
    expect(canReach(shown, 0, 'settings', { visited, values: { ...VALUES, seed: '' } })).toBe(false);
    expect(canReach(shown, 0, 'mode', { visited, values: { ...VALUES, name: ' ' } })).toBe(false);
  });
});

describe('isDirty', () => {
  it('compares each value with the initial one', () => {
    expect(isDirty(VALUES, VALUES)).toBe(false);
    expect(isDirty({ ...VALUES }, VALUES)).toBe(false);
    expect(isDirty({ ...VALUES, seed: 'b71e02' }, VALUES)).toBe(true);
    expect(isDirty({ ...VALUES, extra: 1 }, VALUES)).toBe(true);
  });
});

describe('wizardReducer', () => {
  const start = initialWizardState(VALUES, 'basics');

  it('moves and records visited steps once', () => {
    const moved = wizardReducer(wizardReducer(start, { type: 'go', id: 'mode' }), { type: 'go', id: 'basics' });
    expect(moved.currentId).toBe('basics');
    expect(moved.visited).toEqual(['basics', 'mode']);
  });

  it('merges input and clears stale errors', () => {
    const failed = wizardReducer(start, { type: 'error', id: 'review', error: 'Server offline' });
    expect(failed.errors).toEqual({ review: 'Server offline' });
    const edited = wizardReducer(failed, { type: 'update', patch: { name: 'Casual run' } });
    expect(edited.values).toEqual({ ...VALUES, name: 'Casual run' });
    expect(edited.errors).toEqual({});
  });

  it('keeps every input when a finish fails, and marks a success finished', () => {
    const busy = wizardReducer(start, { type: 'finish-start' });
    expect(busy.busy).toBe(true);
    const failed = wizardReducer(busy, { type: 'finish-end', id: 'review', error: 'Seed generation failed' });
    expect(failed).toMatchObject({ busy: false, finished: false, values: VALUES, errors: { review: 'Seed generation failed' } });
    const done = wizardReducer(busy, { type: 'finish-end', id: 'review', error: null });
    expect(done).toMatchObject({ busy: false, finished: true, errors: {} });
  });

  it('resets to the first step and the initial values', () => {
    const moved = wizardReducer(start, { type: 'go', id: 'review' });
    const reset = wizardReducer(moved, { type: 'reset', values: VALUES, currentId: 'basics' });
    expect(reset).toEqual(start);
  });
});

describe('wizardView', () => {
  it('describes the current step among the shown ones', () => {
    const view = wizardView(STEPS, stateAt('settings', ['basics', 'mode', 'settings'], { ...VALUES, mode: 'standard' }));
    expect(ids(view.steps)).toEqual(['basics', 'mode', 'settings', 'review']);
    expect(view).toMatchObject({ index: 2, isFirst: false, isLast: false, invalid: null });
    expect(view.current.id).toBe('settings');
    expect(view.canGoTo('basics')).toBe(true);
  });

  it('reports why the current step is not ready, and blocks moves while busy', () => {
    const view = wizardView(STEPS, stateAt('basics', ['basics'], { ...VALUES, name: '' }));
    expect(view.invalid).toBe('Name the profile.');
    const busy = wizardView(STEPS, { ...stateAt('review', ids(STEPS)), busy: true });
    expect(busy.canGoTo('basics')).toBe(false);
  });

  it('keeps a problem a field already shows out of the hint', () => {
    const steps = [{ id: 'basics', label: 'Basics', validate: () => ({ message: 'Name taken.', inField: true }) }, { id: 'review', label: 'Review' }];
    const view = wizardView(steps, stateAt('basics', ['basics']));
    expect(view).toMatchObject({ invalid: 'Name taken.', hint: null });
    expect(wizardView(STEPS, stateAt('basics', ['basics'], { ...VALUES, name: '' })).hint).toBe('Name the profile.');
  });

  it('throws when there is no step', () => {
    expect(() => wizardView([], stateAt('basics', []))).toThrow();
  });
});

describe('wizardMoves', () => {
  it('goes next only when the step is valid, and back and to reachable steps', () => {
    const dispatch = vi.fn();
    const moves = wizardMoves(wizardView(STEPS, stateAt('mode', ['basics', 'mode'])), dispatch);
    moves.goNext();
    moves.goBack();
    moves.goTo('review');
    moves.goTo('basics');
    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([
      { type: 'go', id: 'seed' }, { type: 'go', id: 'basics' }, { type: 'go', id: 'basics' },
    ]);
    const stuck = vi.fn();
    wizardMoves(wizardView(STEPS, stateAt('basics', ['basics'], { ...VALUES, name: '' })), stuck).goNext();
    expect(stuck).not.toHaveBeenCalled();
  });

  it('sets one value as a patch', () => {
    const dispatch = vi.fn();
    wizardMoves(wizardView(STEPS, stateAt('basics', ['basics'])), dispatch).setValue('seed', 'b71e02');
    expect(dispatch).toHaveBeenCalledWith({ type: 'update', patch: { seed: 'b71e02' } });
  });
});

describe('settleFinish', () => {
  it('passes an outcome through and turns a throw into a failure', async () => {
    await expect(settleFinish(succeed, VALUES, 'fallback')).resolves.toEqual({ success: true, id: 'p-7' });
    const diskFull = async () => {
      throw new Error('Disk full');
    };
    const odd = () => Promise.reject(new Error(''));
    await expect(settleFinish(diskFull, VALUES, 'fallback')).resolves.toEqual({ success: false, error: 'Disk full' });
    await expect(settleFinish(odd, VALUES, 'fallback')).resolves.toEqual({ success: false, error: 'fallback' });
  });
});

describe('finishWizard', () => {
  const run = (state, onFinish, onFinished) => {
    const dispatch = vi.fn();
    const view = wizardView(STEPS, state);
    return { dispatch, done: finishWizard({ view, state, dispatch, onFinish, onFinished, fallback: 'fallback' }) };
  };

  it('reports success to onFinished', async () => {
    const onFinished = vi.fn();
    const { dispatch, done } = run(stateAt('review', ids(STEPS)), succeed, onFinished);
    await done;
    expect(dispatch.mock.calls.map(([action]) => action.type)).toEqual(['finish-start', 'finish-end']);
    expect(dispatch).toHaveBeenLastCalledWith({ type: 'finish-end', id: 'review', error: null });
    expect(onFinished).toHaveBeenCalledWith('p-7');
  });

  it('shows a failure on the step and does not call onFinished', async () => {
    const onFinished = vi.fn();
    const fail = async () => ({ success: false, error: 'Seed generation failed' });
    const { dispatch, done } = run(stateAt('review', ids(STEPS)), fail, onFinished);
    await done;
    expect(dispatch).toHaveBeenLastCalledWith({ type: 'finish-end', id: 'review', error: 'Seed generation failed' });
    expect(onFinished).not.toHaveBeenCalled();
  });

  it('sends the user to the first step that is not ready instead of finishing', async () => {
    const onFinish = vi.fn();
    const { dispatch, done } = run(stateAt('review', ids(STEPS), { ...VALUES, seed: '' }), onFinish);
    await done;
    expect(onFinish).not.toHaveBeenCalled();
    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([
      { type: 'go', id: 'seed' }, { type: 'error', id: 'seed', error: 'Roll a seed.' },
    ]);
  });

  it('does nothing while a finish already runs', async () => {
    const onFinish = vi.fn();
    const { dispatch, done } = run({ ...stateAt('review', ids(STEPS)), busy: true }, onFinish);
    await done;
    expect(onFinish).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe('useWizard', () => {
  it('opens on the first shown step, clean and idle', () => {
    let seen;
    const Probe = () => {
      seen = useWizard({ steps: STEPS, initialValues: { ...VALUES, name: '' }, onFinish: succeed });
      return null;
    };
    renderToString(h(Probe));
    expect(seen.current.id).toBe('basics');
    expect(seen).toMatchObject({ index: 0, isFirst: true, isLast: false, dirty: false, busy: false, invalid: 'Name the profile.' });
    expect(seen.visited).toEqual(['basics']);
    expect(seen.canGoTo('mode')).toBe(false);
  });
});
