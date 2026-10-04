/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InlineCreateForm } from '../src/composites/InlineCreateForm';
import { ManagedList } from '../src/composites/ManagedList';
import { closeOnEscape } from '../src/composites/ManagedList/behavior/close-on-escape';
import { settleCreate } from '../src/composites/ManagedList/behavior/settle-create';
import { useManagedCreate } from '../src/composites/ManagedList/behavior/useManagedCreate';
import { MasterDetail } from '../src/composites/MasterDetail';

vi.mock('../src/composites/ManagedList/behavior/useManagedCreate', () => ({ useManagedCreate: vi.fn() }));

const PROFILES = [
  { id: 'a', name: 'Weekly async' },
  { id: 'b', name: 'Casual run' },
];

const base = {
  title: 'Profiles',
  items: PROFILES,
  getId: (profile) => profile.id,
  getName: (profile) => profile.name,
  createLabel: 'New profile',
};

const close = vi.fn();
const onNew = vi.fn();
const formOf = (shut) => h(InlineCreateForm, { placeholder: 'Profile name', onCreate: () => {}, onCancel: shut, extraFields: h('p', null, 'Game field') });

const state = (open) => ({ open, onNew, close, newRef: { current: null }, slotRef: { current: null }, onKeyDown: () => {} });
const draw = (props) => renderToStaticMarkup(h(ManagedList, { ...base, ...props }));

describe('ManagedList create', () => {
  beforeEach(() => {
    vi.mocked(useManagedCreate).mockReset().mockReturnValue(state(false));
    close.mockReset();
  });

  it('shows New and no form until New opens it', () => {
    const create = vi.fn(formOf);
    const html = draw({ create });
    expect(html).toContain('>New profile<');
    expect(html).not.toContain('placeholder="Profile name"');
    expect(create).not.toHaveBeenCalled();
    expect(vi.mocked(useManagedCreate).mock.calls[0][0].create).toBe(create);
  });

  it('opens the form at the top of the list in place of New, and hands it close', () => {
    vi.mocked(useManagedCreate).mockReturnValue(state(true));
    const create = vi.fn(formOf);
    const html = draw({ create });
    expect(create).toHaveBeenCalledWith(close);
    expect(html).not.toContain('>New profile<');
    expect(html).toMatch(/<div role="group" aria-label="New profile" class="managed-list__create">/);
    expect(html).toContain('Game field');
    expect(html.indexOf('placeholder="Profile name"')).toBeLessThan(html.indexOf('Weekly async'));
  });

  it('closes on Escape unless a control inside took it, and keeps the key from the dialogs around it', () => {
    const key = (name, defaultPrevented = false) => ({ key: name, defaultPrevented, preventDefault: vi.fn(), stopPropagation: vi.fn() });
    const escape = key('Escape');
    closeOnEscape(escape, close);
    expect(close).toHaveBeenCalledTimes(1);
    expect(escape.preventDefault).toHaveBeenCalled();
    expect(escape.stopPropagation).toHaveBeenCalled();
    closeOnEscape(key('Escape', true), close);
    closeOnEscape(key('Enter'), close);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('passes create through the list of MasterDetail', () => {
    vi.mocked(useManagedCreate).mockReturnValue(state(true));
    const create = vi.fn(formOf);
    const html = renderToStaticMarkup(h(MasterDetail, { list: { ...base, create }, selectedId: 'a', onSelect: () => {}, detail: 'The editor' }));
    expect(vi.mocked(useManagedCreate).mock.calls[0][0].create).toBe(create);
    expect(create).toHaveBeenCalledWith(close);
    expect(html).toContain('placeholder="Profile name"');
  });
});

describe('focus after the create form closes', () => {
  const frame = globalThis.requestAnimationFrame;
  const button = () => ({ focus: vi.fn() });
  const rows = [button(), button(), button()];
  const list = { querySelectorAll: () => rows };

  beforeEach(() => {
    globalThis.requestAnimationFrame = (run) => run();
    rows.forEach((row) => row.focus.mockReset());
  });
  afterEach(() => {
    globalThis.requestAnimationFrame = frame;
  });

  it('goes back to New after Escape or Cancel, when the pick did not change', () => {
    const newButton = button();
    settleCreate({ rowIds: ['a', 'b', 'c'], openedWith: 'a', selectedId: 'a', list, newButton });
    expect(newButton.focus).toHaveBeenCalled();
    expect(rows.some((row) => row.focus.mock.calls.length)).toBe(false);
  });

  it('goes to the new row when the app picks it', () => {
    const newButton = button();
    settleCreate({ rowIds: ['n', 'a', 'b'], openedWith: 'a', selectedId: 'n', list, newButton });
    expect(rows[0].focus).toHaveBeenCalled();
    expect(newButton.focus).not.toHaveBeenCalled();
  });

  it('goes back to New when the picked row is not shown', () => {
    const newButton = button();
    settleCreate({ rowIds: ['a', 'b'], openedWith: null, selectedId: 'n', list, newButton });
    expect(newButton.focus).toHaveBeenCalled();
  });
});
