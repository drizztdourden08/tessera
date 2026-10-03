/* @layer renderer-components @kind data */
import type { FieldControl } from '../../primitives/field-control/field-control.type';
import type { ShortcutKey } from '../../primitives/Shortcut/Shortcut.type';

const NAMED_KEYS: Readonly<Record<string, ShortcutKey>> = {
  Enter: 'enter',
  Tab: 'tab',
  Backspace: 'backspace',
  Delete: 'delete',
  Insert: 'insert',
  Home: 'home',
  End: 'end',
  PageUp: 'pageup',
  PageDown: 'pagedown',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ' ': 'space',
};

const MODIFIER_KEYS: readonly string[] = ['Control', 'Shift', 'Alt', 'Meta', 'AltGraph', 'CapsLock'];

const FUNCTION_KEY = /^F([1-9]|1\d|2[0-4])$/;

const PASSWORD_MASK = '\u2022'.repeat(8);

const HINT_ICON_SIZE = 13;

const COMPACT_CONTROL: FieldControl = { size: 'sm' };

export { COMPACT_CONTROL, FUNCTION_KEY, HINT_ICON_SIZE, MODIFIER_KEYS, NAMED_KEYS, PASSWORD_MASK };
