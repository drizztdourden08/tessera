/* @layer tooling-scripts @kind test */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { closeOnEscape } from '../src/composites/ItemList/behavior/close-on-escape';
import { settleCreate } from '../src/composites/ItemList/behavior/settle-create';

const close = vi.fn();

describe('K1 ItemList create', { tags: ['critical'] }, () => {
  beforeEach(() => {
    close.mockReset();
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
});

describe('K1 focus after the create form closes', { tags: ['critical'] }, () => {
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
