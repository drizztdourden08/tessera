/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useCommandPalette } from '../src/composites/CommandPalette/behavior/useCommandPalette';
import { useConfirmAsk } from '../src/composites/ConfirmIconButton/behavior/useConfirmAsk';
import { escapeStackOf } from '../src/primitives/escape-stack/escape-stack-of';
import { escapeDocument } from './escape-document.mjs';
import { mountHook } from './hook-harness.mjs';

vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));
vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const GROUPS = [{ id: 'screens', items: [{ id: 'home', label: 'Home' }, { id: 'logs', label: 'Logs' }] }];
const page = escapeDocument();

const paletteWithRow = (state, onClose, onCancel) => () => ({
  palette: useCommandPalette({ open: state.open, onClose, query: '', onQueryChange: vi.fn(), groups: GROUPS, onSelect: vi.fn() }),
  row: useConfirmAsk({ onConfirm: vi.fn(), onCancel }),
});

describe('CommandPalette on the shared Escape stack', () => {
  it('cancels the question of a row on the first Escape and closes on the next', () => {
    const state = { open: true };
    const onClose = vi.fn(() => {
      state.open = false;
    });
    const onCancel = vi.fn();
    const draw = paletteWithRow(state, onClose, onCancel);
    const view = mountHook(draw);
    expect(escapeStackOf(page).top()).toBe('dialog');

    view.act((parts) => parts.row.ask(true));
    expect(escapeStackOf(page).top()).toBe('popover');

    expect(page.press('Escape').stopped).toBe(true);
    view.rerender(draw);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(view.current.row.asking).toBeNull();
    expect(onClose).not.toHaveBeenCalled();
    expect(escapeStackOf(page).top()).toBe('dialog');

    page.press('Escape');
    view.rerender(draw);
    expect(onClose).toHaveBeenCalledOnce();
    expect(escapeStackOf(page).depth()).toBe(0);
    expect(page.count()).toBe(0);
  });

  it('leaves Escape in the input to the stack and the search box', () => {
    const onClose = vi.fn();
    const view = mountHook(paletteWithRow({ open: true }, onClose, vi.fn()));
    const key = { key: 'Escape', preventDefault: vi.fn(), ctrlKey: false, metaKey: false };
    view.current.palette.handleKeyDown(key);
    expect(key.preventDefault).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    view.rerender(paletteWithRow({ open: false }, onClose, vi.fn()));
    expect(escapeStackOf(page).depth()).toBe(0);
  });

  it('takes no key while closed', () => {
    const onClose = vi.fn();
    mountHook(paletteWithRow({ open: false }, onClose, vi.fn()));
    expect(page.press('Escape').stopped).toBe(false);
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('CommandPalette takes arrows and typing from anywhere in its panel', () => {
  const keyFrom = (target, key, extra = {}) => ({ key, target, defaultPrevented: false, preventDefault: vi.fn(), ctrlKey: false, metaKey: false, altKey: false, ...extra });
  const paletteWithInput = () => {
    const view = mountHook(paletteWithRow({ open: true }, vi.fn(), vi.fn()));
    const input = { focus: vi.fn() };
    view.current.palette.inputRef.current = input;
    return { view, input };
  };

  it('moves the active row and focus to the search box on an arrow from a row button', () => {
    const { view, input } = paletteWithInput();
    const key = keyFrom({ name: 'trash' }, 'ArrowDown');
    view.act((parts) => parts.palette.handlePanelKeyDown(key));
    expect(input.focus).toHaveBeenCalledOnce();
    expect(key.preventDefault).toHaveBeenCalled();
    expect(view.current.palette.active).toBe(1);
  });

  it('sends a typed letter or Backspace to the search box', () => {
    const { view, input } = paletteWithInput();
    const letter = keyFrom({ name: 'trash' }, 'l');
    view.act((parts) => parts.palette.handlePanelKeyDown(letter));
    view.act((parts) => parts.palette.handlePanelKeyDown(keyFrom({ name: 'trash' }, 'Backspace')));
    expect(input.focus).toHaveBeenCalledTimes(2);
    expect(letter.preventDefault).not.toHaveBeenCalled();
  });

  it('leaves Enter, Space, shortcuts and keys in the search box itself alone', () => {
    const { view, input } = paletteWithInput();
    const button = { name: 'trash' };
    for (const key of [keyFrom(button, 'Enter'), keyFrom(button, ' '), keyFrom(button, 'k', { ctrlKey: true }), keyFrom(input, 'ArrowDown')]) {
      view.act((parts) => parts.palette.handlePanelKeyDown(key));
    }
    expect(input.focus).not.toHaveBeenCalled();
    expect(view.current.palette.active).toBe(0);
  });
});
