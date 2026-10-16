/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { CommandPalette, CommandPaletteRow } from '../src/composites/CommandPalette';
import { MenuItemButton } from '../src/composites/DropdownMenu/sub-components/MenuItemButton';
import { SubMenu } from '../src/composites/DropdownMenu/sub-components/SubMenu';
import { FloatingSwitchOption } from '../src/composites/FloatingSwitch/sub-components/FloatingSwitchOption';
import { SideNavItem } from '../src/composites/SideNav/sub-components/SideNavItem';
import { useHighlight } from '../src/primitives/dom/useHighlight';
import { COMMON_STRINGS } from '../src/primitives/strings/common-strings.constants';
import { ITEM_STRINGS } from '../src/primitives/strings/items-strings.constants';
import { NAVIGATION_STRINGS } from '../src/primitives/strings/navigation-strings.constants';
import { escapeDocument } from './escape-document.mjs';
import { mountHook } from './hook-harness.mjs';

const STRINGS = { common: COMMON_STRINGS, items: ITEM_STRINGS, navigation: NAVIGATION_STRINGS };

vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', () => ({ useTesseraStrings: () => STRINGS }));
vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraOverride', () => ({ useTesseraOverride: () => page }));
vi.mock('react', async (importOriginal) => ({
  ...(await importOriginal()),
  ...(await import('./hook-harness.mjs')).hooks,
  useContext: (context) => context._currentValue,
  useId: () => 'item',
}));

const page = escapeDocument();
const noop = () => undefined;

describe('useHighlight', () => {
  it('calls onHighlight once on pointer enter, and not again while focus keeps the item lit', () => {
    const onHighlight = vi.fn();
    const view = mountHook(() => useHighlight({ onHighlight }));
    view.current.onPointerEnter();
    view.current.onPointerEnter();
    view.current.onFocus();
    view.current.onPointerLeave();
    expect(onHighlight).toHaveBeenCalledOnce();
    view.current.onBlur();
    view.current.onPointerEnter();
    expect(onHighlight).toHaveBeenCalledTimes(2);
  });

  it('calls it when focus or an arrow key lands on the item, once per landing', () => {
    const onHighlight = vi.fn();
    const view = mountHook(() => useHighlight({ onHighlight }));
    view.current.onFocus();
    view.current.onFocus();
    expect(onHighlight).toHaveBeenCalledOnce();
    view.current.onBlur();
    view.current.onFocus();
    expect(onHighlight).toHaveBeenCalledTimes(2);
  });

  it('follows active, the row a list marks with the arrow keys, through a strict remount', () => {
    const onHighlight = vi.fn();
    const state = { active: false };
    const draw = () => useHighlight({ onHighlight, active: state.active });
    const view = mountHook(draw);
    expect(onHighlight).not.toHaveBeenCalled();
    state.active = true;
    view.rerender(draw);
    view.strictRemount();
    view.rerender(draw);
    view.current.onPointerEnter();
    expect(onHighlight).toHaveBeenCalledOnce();
    state.active = false;
    view.rerender(draw);
    view.current.onPointerLeave();
    state.active = true;
    view.rerender(draw);
    expect(onHighlight).toHaveBeenCalledTimes(2);
  });

  it('never calls it for a disabled item', () => {
    const onHighlight = vi.fn();
    const view = mountHook(() => useHighlight({ onHighlight, disabled: true, active: true }));
    view.current.onPointerEnter();
    view.current.onFocus();
    expect(onHighlight).not.toHaveBeenCalled();
  });
});

const ITEM_PARTS = [
  ['a DropdownMenu item', (item) => MenuItemButton({ item }).props],
  ['a DropdownMenu check item', (item) => MenuItemButton({ item: { ...item, checked: true } }).props],
  ['a DropdownMenu radio item', (item) => MenuItemButton({ item: { ...item, kind: 'radio', checked: false } }).props],
  ['a DropdownMenu confirm item', (item) => MenuItemButton({ item: { ...item, kind: 'confirm' } }).props],
  ['a DropdownMenu submenu trigger', (item) => SubMenu({ item, nodes: [{ id: 'leaf', label: 'Leaf' }] }).props.children[0].props],
  ['a SideNav entry', (item) => SideNavItem({ item: { ...item, icon: null }, active: false, onSelect: noop }).props],
  ['a FloatingSwitch item', (item) => FloatingSwitchOption({ item: { ...item, icon: null }, active: false, onSelect: noop }).props],
];

describe.each(ITEM_PARTS)('%s', (_name, draw) => {
  it('calls item.onHighlight once on pointer enter or focus, and not again while it stays lit', () => {
    for (const first of ['onPointerEnter', 'onFocus']) {
      const onHighlight = vi.fn();
      const view = mountHook(() => draw({ id: 'logs', label: 'Logs', onHighlight }));
      view.current[first]();
      view.current.onPointerEnter();
      view.current.onFocus();
      expect(onHighlight).toHaveBeenCalledOnce();
    }
  });

  it('stays quiet while disabled', () => {
    const onHighlight = vi.fn();
    const view = mountHook(() => draw({ id: 'logs', label: 'Logs', disabled: true, onHighlight }));
    view.current.onPointerEnter();
    view.current.onFocus();
    expect(onHighlight).not.toHaveBeenCalled();
  });
});

describe('a DropdownMenu item that asks to confirm', () => {
  it('still cancels its question on blur', () => {
    const onCancel = vi.fn();
    const view = mountHook(() => MenuItemButton({ item: { id: 'reset', label: 'Reset', kind: 'confirm', onCancel } }));
    view.act((props) => props.props.onClick());
    view.act((props) => props.props.onBlur({}));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});

describe('CommandPalette rows', () => {
  const HOME = { id: 'home', label: 'Home' };

  it('call onHighlight when the arrow keys or the pointer make a row active, once', () => {
    const onHighlight = vi.fn();
    const state = { active: false };
    const draw = () => CommandPaletteRow({ item: { ...HOME, onHighlight }, active: state.active });
    const view = mountHook(draw);
    expect(onHighlight).not.toHaveBeenCalled();
    state.active = true;
    view.rerender(draw);
    view.rerender(draw);
    expect(onHighlight).toHaveBeenCalledOnce();
  });

  it('stay quiet for a disabled row', () => {
    const onHighlight = vi.fn();
    mountHook(() => CommandPaletteRow({ item: { ...HOME, disabled: true, onHighlight }, active: true }));
    expect(onHighlight).not.toHaveBeenCalled();
  });

  it('mark no row active while the palette is closed', () => {
    const listOf = (open) => {
      const tree = mountHook(() => CommandPalette({ open, onClose: noop, query: '', onQueryChange: noop, groups: [{ id: 'g', items: [HOME] }], onSelect: noop }));
      const panel = tree.current.props.children[1];
      return panel.props.children[2].props.children;
    };
    expect(listOf(false).props.active).toBe(-1);
    expect(listOf(true).props.active).toBe(0);
  });
});
