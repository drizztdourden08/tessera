/* @layer renderer-components @kind constants */
const SHORTCUT_LEGENDS = ['label', 'symbol'] as const;

const KEY_SPECS = {
  ctrl: { name: 'Control', label: 'Ctrl', symbol: 'control' },
  alt: { name: 'Alt', label: 'Alt', symbol: 'option' },
  option: { name: 'Option', label: 'Option', symbol: 'option' },
  shift: { name: 'Shift', label: 'Shift', symbol: 'shift', width: 'wide' },
  cmd: { name: 'Command', symbol: 'command' },
  win: { name: 'Windows', label: 'Win' },
  fn: { name: 'Fn', label: 'Fn' },
  enter: { name: 'Enter', label: 'Enter', symbol: 'enter', width: 'wide' },
  tab: { name: 'Tab', label: 'Tab', symbol: 'tab', width: 'wide' },
  backspace: { name: 'Backspace', label: 'Backspace', symbol: 'backspace', width: 'wide' },
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
  up: { name: 'Up arrow', symbol: 'up' },
  down: { name: 'Down arrow', symbol: 'down' },
  left: { name: 'Left arrow', symbol: 'left' },
  right: { name: 'Right arrow', symbol: 'right' },
} as const;

export { KEY_SPECS, SHORTCUT_LEGENDS };
