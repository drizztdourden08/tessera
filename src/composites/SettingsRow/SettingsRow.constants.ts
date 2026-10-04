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

const RESET_ICON_SIZE = 12;

const PROBLEM_ICON_SIZE = 13;

const SLIDER_HINT_SAMPLES = 256;

const COMPACT_CONTROL: FieldControl = { size: 'sm' };

const COMPACT_TITLE_MAX_SHARE = 0.5;

const ROW_SELECTOR = '.settings-row';

const TEXT_SELECTOR = '.settings-row__text';

const ACTIONS_SELECTOR = '.settings-row__actions';

const TITLE_SELECTOR = '.settings-row__title';

export {
  ACTIONS_SELECTOR, COMPACT_CONTROL, COMPACT_TITLE_MAX_SHARE, FUNCTION_KEY, HINT_ICON_SIZE, MODIFIER_KEYS, NAMED_KEYS, PASSWORD_MASK, PROBLEM_ICON_SIZE,
  RESET_ICON_SIZE, ROW_SELECTOR, SLIDER_HINT_SAMPLES, TEXT_SELECTOR, TITLE_SELECTOR,
};
