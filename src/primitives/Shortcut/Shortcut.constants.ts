/* @layer renderer-components @kind constants */
const SHORTCUT_LEGENDS = ['label', 'symbol', 'arrow'] as const;

const CAP_WIDTHS = ['normal', 'wide'] as const;

const SHORTCUT_STATES = ['idle', 'lit', 'pressed'] as const;

const LETTER_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const CHARACTER_KEYS = '0123456789`~!@#$%^&*()-_=+[]{}\\|;:\'",.<>/?';

const FUNCTION_KEY_COUNT = 24;

const KEY_SPECS = {
  ctrl: { name: 'Control', label: 'Ctrl', symbol: 'control' },
  alt: { name: 'Alt', label: 'Alt', symbol: 'option' },
  option: { name: 'Option', label: 'Option', symbol: 'option' },
  shift: { name: 'Shift', label: 'Shift', symbol: 'shift', width: 'wide' },
  cmd: { name: 'Command', symbol: 'command' },
  win: { name: 'Windows', label: 'Win' },
  fn: { name: 'Fn', label: 'Fn', symbol: 'globe' },
  enter: { name: 'Enter', label: 'Enter', symbol: 'enter', width: 'wide' },
  tab: { name: 'Tab', label: 'Tab', symbol: 'tab', arrow: 'tabForward', width: 'wide' },
  backspace: { name: 'Backspace', label: 'Backspace', symbol: 'backspace', arrow: 'longBack', width: 'wide' },
  delete: { name: 'Delete', label: 'Del', symbol: 'delete' },
  esc: { name: 'Escape', label: 'Esc' },
  capslock: { name: 'Caps Lock', label: 'Caps Lock', symbol: 'capslock', width: 'wide' },
  space: { name: 'Space', label: 'Space', width: 'space' },
  insert: { name: 'Insert', label: 'Ins' },
  home: { name: 'Home', label: 'Home', symbol: 'home' },
  end: { name: 'End', label: 'End', symbol: 'end' },
  pageup: { name: 'Page up', label: 'PgUp' },
  pagedown: { name: 'Page down', label: 'PgDn' },
  printscreen: { name: 'Print screen', label: 'PrtSc' },
  scrolllock: { name: 'Scroll lock', label: 'ScrLk' },
  pause: { name: 'Pause', label: 'Pause' },
  numlock: { name: 'Num lock', label: 'Num' },
  menu: { name: 'Menu', label: 'Menu' },
  up: { name: 'Up arrow', symbol: 'up' },
  down: { name: 'Down arrow', symbol: 'down' },
  left: { name: 'Left arrow', symbol: 'left' },
  right: { name: 'Right arrow', symbol: 'right' },
} as const;

export { CAP_WIDTHS, CHARACTER_KEYS, FUNCTION_KEY_COUNT, KEY_SPECS, LETTER_KEYS, SHORTCUT_LEGENDS, SHORTCUT_STATES };
