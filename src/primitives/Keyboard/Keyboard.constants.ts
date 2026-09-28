/* @layer renderer-components @kind constants */
const KEYBOARD_PLATFORMS = ['auto', 'mac', 'windows'] as const;

const ALT = { name: 'Alt', word: 'Alt', mac: { name: 'Option', symbol: 'option' } } as const;
const META = { name: 'Windows', word: 'Win', mac: { name: 'Command', symbol: 'command' } } as const;
const ESCAPE = { name: 'Escape', word: 'Esc', mac: { word: 'esc' } } as const;

const KEY_SPECS = {
  ctrl: { name: 'Control', word: 'Ctrl', mac: { symbol: 'control' } },
  alt: ALT,
  option: ALT,
  shift: { name: 'Shift', word: 'Shift', symbol: 'shift', mac: { symbol: 'shift' }, width: 'wide' },
  meta: META,
  cmd: META,
  mod: { name: 'Control', word: 'Ctrl', mac: { name: 'Command', symbol: 'command' } },
  fn: { name: 'Fn', word: 'Fn', mac: { word: 'fn' } },
  enter: { name: 'Enter', word: 'Enter', symbol: 'enter', mac: { name: 'Return', symbol: 'enter' }, width: 'wide' },
  tab: { name: 'Tab', word: 'Tab', symbol: 'tab', mac: { symbol: 'tab' }, width: 'wide' },
  backspace: { name: 'Backspace', word: 'Backspace', mac: { name: 'Delete', symbol: 'backspace' }, width: 'wide' },
  delete: { name: 'Delete', word: 'Del', mac: { name: 'Forward delete', symbol: 'delete' } },
  escape: ESCAPE,
  esc: ESCAPE,
  capslock: { name: 'Caps Lock', word: 'Caps Lock', mac: { symbol: 'capslock' }, width: 'wide' },
  space: { name: 'Space', word: 'Space', width: 'space' },
  insert: { name: 'Insert', word: 'Ins' },
  home: { name: 'Home', word: 'Home', mac: { symbol: 'home' } },
  end: { name: 'End', word: 'End', mac: { symbol: 'end' } },
  pageup: { name: 'Page up', word: 'PgUp', mac: { symbol: 'pageup' } },
  pagedown: { name: 'Page down', word: 'PgDn', mac: { symbol: 'pagedown' } },
  printscreen: { name: 'Print screen', word: 'PrtSc' },
  up: { name: 'Up arrow', symbol: 'up' },
  down: { name: 'Down arrow', symbol: 'down' },
  left: { name: 'Left arrow', symbol: 'left' },
  right: { name: 'Right arrow', symbol: 'right' },
} as const;

export { KEY_SPECS, KEYBOARD_PLATFORMS };
