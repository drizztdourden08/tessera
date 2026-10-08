/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAsk } from '../src/composites/ActionBar/behavior/useAsk';
import { ConfirmIconButton } from '../src/composites/ConfirmIconButton';
import { useConfirmAsk } from '../src/composites/ConfirmIconButton/behavior/useConfirmAsk';
import { CONFIRM_ITEM_MS } from '../src/composites/DropdownMenu/DropdownMenu.constants';
import { useConfirmItem } from '../src/composites/DropdownMenu/behavior/useConfirmItem';
import { SettingsRowActionButton } from '../src/composites/SettingsRow/sub-components/SettingsRowActionButton';
import { ITEM_STRINGS } from '../src/primitives/strings/items-strings.constants';
import { mountHook } from './hook-harness.mjs';
import { escapeStackOf } from '../src/primitives/escape-stack/escape-stack-of';
import { pushEscape } from '../src/primitives/escape-stack/push-escape';
import { escapeDocument } from './escape-document.mjs';

const page = escapeDocument();

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', () => ({ useTesseraStrings: () => ({ items: ITEM_STRINGS }) }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));

const spies = () => ({ onConfirm: vi.fn(), onCancel: vi.fn(), onAsk: vi.fn() });
const escape = () => ({ key: 'Escape', stopPropagation: vi.fn(), preventDefault: vi.fn() });
const askRow = (calls, extra = {}) => mountHook(() => useConfirmAsk({ ...calls, ...extra }));
const menuItem = (onCancel, pick) => mountHook(() => useConfirmItem({ id: 'reset', label: 'Reset layout', kind: 'confirm', onCancel }, true, pick));

describe('an ask that ends without confirming runs onCancel', () => {
  let calls;
  beforeEach(() => {
    calls = spies();
  });

  it('from the cross', () => {
    const ask = askRow(calls);
    ask.act((a) => a.ask('row'));
    expect(calls.onAsk).toHaveBeenCalledWith('row');
    ask.act((a) => a.cancel());
    expect(calls.onCancel).toHaveBeenCalledWith('row');
    expect(ask.current.asking).toBeNull();
  });

  it('on Escape, and keeps the key from the layers around it', () => {
    const ask = askRow(calls);
    ask.act((a) => a.onKeyDown(escape()));
    expect(calls.onCancel).not.toHaveBeenCalled();
    ask.act((a) => a.ask('row'));
    const key = escape();
    ask.act((a) => a.onKeyDown({ key: 'Enter', stopPropagation: vi.fn() }));
    ask.act((a) => a.onKeyDown(key));
    expect(key.stopPropagation).toHaveBeenCalled();
    expect(key.preventDefault).toHaveBeenCalled();
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
  });

  it('on an Escape anywhere on the page while it asks, before the dialog around it', () => {
    const ask = askRow(calls);
    const dialog = vi.fn();
    const leaveDialog = pushEscape(page, 'dialog', dialog);
    expect(page.press('Escape').defaultPrevented).toBe(true);
    expect(dialog).toHaveBeenCalledTimes(1);
    ask.act((a) => a.ask('row'));
    ask.act(() => page.press('Escape'));
    expect(calls.onCancel).toHaveBeenCalledWith('row');
    expect(dialog).toHaveBeenCalledTimes(1);
    expect(escapeStackOf(page).depth()).toBe(1);
    leaveDialog();
  });

  it('when focus or the pointer leaves a DropdownMenu confirm item', () => {
    const item = menuItem(calls.onCancel, calls.onConfirm);
    item.act((c) => c.press());
    item.act((c) => c.handlers.onBlur());
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
    item.act((c) => c.press());
    item.act((c) => c.handlers.onMouseLeave());
    expect(calls.onCancel).toHaveBeenCalledTimes(2);
    expect(item.current.asking).toBe(false);
  });

});

describe('onCancel also runs', () => {
  let calls;
  beforeEach(() => {
    calls = spies();
  });
  afterEach(() => vi.useRealTimers());

  it('when the question of a DropdownMenu confirm item times out', () => {
    vi.useFakeTimers();
    const item = menuItem(calls.onCancel, calls.onConfirm);
    item.act((c) => c.press());
    item.act(() => vi.advanceTimersByTime(CONFIRM_ITEM_MS - 1));
    expect(item.current.asking).toBe(true);
    item.act(() => vi.advanceTimersByTime(1));
    expect(item.current.asking).toBe(false);
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
  });

  it('when the part turns disabled while it asks', () => {
    const ask = askRow(calls);
    ask.act((a) => a.ask('row'));
    ask.rerender(() => useConfirmAsk({ ...calls, disabled: true }));
    expect(ask.current.asking).toBeNull();
    expect(calls.onCancel).toHaveBeenCalledWith('row');
  });

  it('for the first question when a second one takes its place', () => {
    const ask = askRow(calls);
    ask.act((a) => a.ask('first'));
    ask.act((a) => a.ask('second'));
    expect(calls.onCancel).toHaveBeenCalledWith('first');
    expect(calls.onAsk).toHaveBeenLastCalledWith('second');
    expect(ask.current.asking).toBe('second');
  });

  it('and never when the user confirms', () => {
    const ask = askRow(calls, { timeout: 10 });
    ask.act((a) => a.ask('row'));
    ask.act((a) => a.confirm());
    ask.act((a) => a.cancel());
    ask.act((a) => a.onKeyDown(escape()));
    expect(calls.onConfirm).toHaveBeenCalledWith('row');
    expect(calls.onCancel).not.toHaveBeenCalled();
  });
});

describe('the parts on the shared ask pass onCancel through', () => {
  it('ConfirmIconButton runs onAsk on the press and onCancel from the cross or Escape', () => {
    const calls = spies();
    const props = { icon: h('i'), label: 'Delete', confirmLabel: 'Delete it', cancelLabel: 'Keep it', ...calls };
    const button = mountHook(() => ConfirmIconButton(props));
    const [first] = button.current.props.children;
    button.act(() => first.props.onClick());
    expect(calls.onAsk).toHaveBeenCalledTimes(1);
    const [, question] = button.current.props.children;
    button.act(() => question.props.onCancel());
    expect(calls.onCancel).toHaveBeenCalledTimes(1);
    button.act(() => button.current.props.children[0].props.onClick());
    button.act((tree) => tree.props.onKeyDown(escape()));
    expect(calls.onCancel).toHaveBeenCalledTimes(2);
    expect(calls.onConfirm).not.toHaveBeenCalled();
  });

  it('ActionBar runs the onCancel of the action that asked', () => {
    const action = { id: 'delete', label: 'Delete', kind: 'danger', onSelect: vi.fn(), onCancel: vi.fn() };
    const bar = mountHook(() => useAsk({ current: null }));
    bar.act((a) => a.ask(action));
    bar.act((a) => a.cancel());
    expect(action.onCancel).toHaveBeenCalledTimes(1);
    expect(action.onSelect).not.toHaveBeenCalled();
  });

  it('SettingsRow runs the onCancel of its action', () => {
    const action = { id: 'forget', label: 'Forget', confirm: 'Forget the cache?', onSelect: vi.fn(), onCancel: vi.fn() };
    const row = mountHook(() => SettingsRowActionButton({ action, disabled: false }));
    row.act((tree) => tree.props.onClick());
    row.act((tree) => tree.props.ask.cancel());
    expect(action.onCancel).toHaveBeenCalledTimes(1);
    expect(action.onSelect).not.toHaveBeenCalled();
  });
});
