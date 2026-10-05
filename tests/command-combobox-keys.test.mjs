/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useCommandInput } from '../src/composites/CommandInput/behavior/useCommandInput';
import { useComboboxKeys } from '../src/primitives/Combobox/behavior/useComboboxKeys';
import { useComboboxText } from '../src/primitives/Combobox/behavior/useComboboxText';
import { useFreeDrop } from '../src/primitives/Combobox/behavior/useFreeDrop';
import { useStartActive } from '../src/primitives/listbox/useStartActive';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const COMMANDS = [{ command: '/save', description: 'Write the save file' }, { command: '/status' }];

const press = (key, value = '') => {
  const event = {
    key, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, nativeEvent: { isComposing: false },
    currentTarget: { value, selectionStart: value.length, selectionEnd: value.length },
    defaultPrevented: false, stopPropagation: vi.fn(),
  };
  event.preventDefault = () => {
    event.defaultPrevented = true;
  };
  return event;
};

const SHUT = { open: false, active: undefined };

const mountLine = () => {
  const onSubmit = vi.fn();
  const view = mountHook(() => useCommandInput({ onSubmit, commands: COMMANDS, history: ['/players', '/save'] }));
  const key = (name, list = SHUT) => {
    const event = press(name, view.current.value);
    view.act((current) => current.onKeyDown(event, list));
    return event;
  };
  const type = (text) => view.act((current) => current.change(text));
  return { view, onSubmit, key, type };
};

describe('CommandInput keys around the Combobox list', () => {
  it('lists the closest commands for Combobox to draw', () => {
    const { view, type } = mountLine();
    type('/s');
    expect(view.current.hits.map((entry) => entry.command)).toEqual(['/save', '/status']);
  });

  it('completes the top row with Tab while no row is active, and the active row once one is', () => {
    const { view, type, key } = mountLine();
    type('/s');
    expect(key('Tab', { open: true, active: undefined }).defaultPrevented).toBe(true);
    expect(view.current.value).toBe('/save ');
    type('/s');
    key('ArrowRight', { open: true, active: COMMANDS[1] });
    expect(view.current.value).toBe('/status ');
  });

  it('leaves Up, Down and Enter on an active row to Combobox while the list is open', () => {
    const { view, type, key, onSubmit } = mountLine();
    type('/s');
    expect(key('ArrowDown', { open: true, active: undefined }).defaultPrevented).toBe(false);
    expect(key('Enter', { open: true, active: COMMANDS[0] }).defaultPrevented).toBe(false);
    expect(view.current.value).toBe('/s');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('sends with Enter while no row is active', () => {
    const { view, type, key, onSubmit } = mountLine();
    type('/s');
    expect(key('Enter', { open: true, active: undefined }).defaultPrevented).toBe(true);
    expect(onSubmit).toHaveBeenCalledWith('/s');
    expect(view.current.value).toBe('');
  });

  it('walks the history with Up and Down while the list is shut, and lists nothing during the walk', () => {
    const { view, key } = mountLine();
    expect(key('ArrowUp').defaultPrevented).toBe(true);
    expect(view.current.value).toBe('/save');
    expect(view.current.hits).toEqual([]);
    key('ArrowUp');
    expect(view.current.value).toBe('/players');
    key('ArrowDown');
    key('ArrowDown');
    expect(view.current.value).toBe('');
  });

  it('clears with Escape and stops it, and lets it pass on an empty line', () => {
    const { view, type, key } = mountLine();
    type('/sa');
    const clear = key('Escape');
    expect(view.current.value).toBe('');
    expect(clear.stopPropagation).toHaveBeenCalled();
    expect(key('Escape').defaultPrevented).toBe(false);
  });

  it('completes a row picked with the pointer through onChange', () => {
    const { view, type } = mountLine();
    type('/st');
    view.act((current) => current.complete('/status'));
    expect(view.current.value).toBe('/status ');
    view.act((current) => current.complete(null));
    expect(view.current.value).toBe('/status ');
  });
});

const keyParams = (overrides = {}) => ({
  drop: { open: true, show: vi.fn(), close: vi.fn() },
  model: { active: { move: vi.fn() } },
  editing: false,
  free: true,
  emptyInput: false,
  pickActive: () => false,
  removeLast: vi.fn(),
  revert: vi.fn(),
  ...overrides,
});

describe('Combobox freeText keys', () => {
  it('lets Enter pass with no active row, so the app sends the text', () => {
    const event = press('Enter');
    useComboboxKeys(keyParams())(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('picks the active row with Enter and stops it', () => {
    const pickActive = vi.fn(() => true);
    const event = press('Enter');
    useComboboxKeys(keyParams({ pickActive }))(event);
    expect(pickActive).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });

  it('keeps Enter for itself on a Combobox that picks from its list', () => {
    const event = press('Enter');
    useComboboxKeys(keyParams({ free: false }))(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('moves the active row with Down while open, and opens the list while shut', () => {
    const params = keyParams();
    useComboboxKeys(params)(press('ArrowDown'));
    expect(params.model.active.move).toHaveBeenCalledWith(1);
    const shut = keyParams({ drop: { open: false, show: vi.fn(), close: vi.fn() } });
    useComboboxKeys(shut)(press('ArrowDown'));
    expect(shut.drop.show).toHaveBeenCalled();
  });
});

describe('Combobox freeText text', () => {
  it('shows the text the app holds and reports typing without keeping its own', () => {
    const onQueryChange = vi.fn();
    const view = mountHook(() => useComboboxText({ freeText: true, query: '/sa', onQueryChange }, true));
    expect(view.current.text).toBe('/sa');
    view.act((current) => current.set('/sav'));
    expect(onQueryChange).toHaveBeenCalledWith('/sav');
    expect(view.current.text).toBe('/sa');
  });

  it('keeps the text when the list closes', () => {
    const onQueryChange = vi.fn();
    const view = mountHook(() => useComboboxText({ freeText: true, onQueryChange }, true));
    view.act((current) => current.set('/hint Ana'));
    view.act((current) => current.revert());
    expect(view.current.text).toBe('/hint Ana');
    expect(onQueryChange).toHaveBeenCalledTimes(1);
  });

  it('drops the typed text on close when the text is only a search', () => {
    const view = mountHook(() => useComboboxText({}, false));
    view.act((current) => current.set('lin'));
    view.act((current) => current.revert());
    expect(view.current.text).toBeNull();
  });
});

const fakeModel = (rows, query) => ({
  rows: { entries: Array.from({ length: rows }, (_, at) => ({ index: at })) },
  active: { index: -1, move: vi.fn(), activate: vi.fn() },
  query,
  states: [],
});

describe('Combobox freeText list', () => {
  it('opens with no active row, so Enter keeps the typed text', () => {
    const model = fakeModel(2, '/s');
    mountHook(() => useStartActive(true, model, false));
    expect(model.active.move).not.toHaveBeenCalled();
    expect(model.active.activate).not.toHaveBeenCalled();
  });

  it('activates the first row of a Combobox that picks from its list', () => {
    const model = fakeModel(2, '');
    mountHook(() => useStartActive(true, model));
    expect(model.active.move).toHaveBeenCalledWith('first');
  });

  it('shuts the list while no row matches', () => {
    const drop = { open: true, close: vi.fn() };
    const view = mountHook(() => useFreeDrop(true, false, { drop, model: fakeModel(0, '/save') }));
    expect(view.current.open).toBe(false);
    expect(drop.close).toHaveBeenCalled();
  });

  it('keeps an empty list open while it loads, and on a Combobox that picks from its list', () => {
    const drop = { open: true, close: vi.fn() };
    expect(mountHook(() => useFreeDrop(true, true, { drop, model: fakeModel(0, 'x') })).current.open).toBe(true);
    expect(mountHook(() => useFreeDrop(false, false, { drop, model: fakeModel(0, 'x') })).current.open).toBe(true);
    expect(drop.close).not.toHaveBeenCalled();
  });
});
