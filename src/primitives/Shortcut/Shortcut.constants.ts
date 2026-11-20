/* @layer renderer-components @kind constants */
const SHORTCUT_LEGENDS = ['label', 'symbol', 'arrow'] as const;

const CAP_WIDTHS = ['normal', 'wide'] as const;

const SHORTCUT_STATES = ['idle', 'lit', 'pressed'] as const;

const SHORTCUT_SIZES = ['xs', 'md'] as const;

const LETTER_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const CHARACTER_KEYS = '0123456789`~!@#$%^&*()-_=+[]{}\\|;:\'",.<>/?';

const FUNCTION_KEY_COUNT = 24;

const KEY_SPECS = {
  ctrl: { label: true, symbol: 'control' },
  alt: { label: true, symbol: 'option' },
  option: { label: true, symbol: 'option' },
  shift: { label: true, symbol: 'shift', width: 'wide' },
  cmd: { symbol: 'command' },
  win: { label: true },
  fn: { label: true, symbol: 'globe' },
  enter: { label: true, symbol: 'enter', width: 'wide' },
  tab: { label: true, symbol: 'tab', arrow: 'tabForward', width: 'wide' },
  backspace: { label: true, symbol: 'backspace', arrow: 'longBack', width: 'wide' },
  delete: { label: true, symbol: 'delete' },
  esc: { label: true },
  capslock: { label: true, symbol: 'capslock', width: 'wide' },
  space: { label: true, width: 'space' },
  insert: { label: true },
  home: { label: true, symbol: 'home' },
  end: { label: true, symbol: 'end' },
  pageup: { label: true },
  pagedown: { label: true },
  printscreen: { label: true },
  scrolllock: { label: true },
  pause: { label: true },
  numlock: { label: true },
  menu: { label: true },
  up: { symbol: 'up' },
  down: { symbol: 'down' },
  left: { symbol: 'left' },
  right: { symbol: 'right' },
} as const;

export { CAP_WIDTHS, CHARACTER_KEYS, FUNCTION_KEY_COUNT, KEY_SPECS, LETTER_KEYS, SHORTCUT_LEGENDS, SHORTCUT_SIZES, SHORTCUT_STATES };
