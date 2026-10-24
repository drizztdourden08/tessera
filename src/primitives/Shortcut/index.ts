/* @layer renderer-components @kind barrel */
export { Shortcut, Shortcut as Sc } from './Shortcut';
export {
  CAP_WIDTHS, CHARACTER_KEYS, FUNCTION_KEY_COUNT, KEY_SPECS, LETTER_KEYS, SHORTCUT_LEGENDS, SHORTCUT_SIZES, SHORTCUT_STATES,
} from './Shortcut.constants';
export { shortcutKeys } from './behavior/shortcut-keys';
export { shortcutRows } from './behavior/shortcut-rows';
export { MOUSE_SPECS } from './sub-components/MouseCap.constants';
export type {
  CapWidth, FunctionKey, KeyName, LabelledShortcut, MouseButton, PrintableKey, ShortcutKey, ShortcutKeys, ShortcutLegend, ShortcutProps,
  ShortcutRow, ShortcutSize, ShortcutSpec, ShortcutState,
} from './Shortcut.type';
