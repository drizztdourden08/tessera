/* @layer renderer-components @kind constants */
import type { KeyName } from '../../../primitives/Shortcut';

const ARIA_KEY_NAMES: Record<KeyName, string> = {
  ctrl: 'Control', alt: 'Alt', option: 'Option', shift: 'Shift', cmd: 'Command', win: 'Windows', fn: 'Fn', enter: 'Enter', tab: 'Tab',
  backspace: 'Backspace', delete: 'Delete', esc: 'Escape', capslock: 'Caps Lock', space: 'Space', insert: 'Insert', home: 'Home', end: 'End',
  pageup: 'Page up', pagedown: 'Page down', printscreen: 'Print screen', scrolllock: 'Scroll lock', pause: 'Pause', numlock: 'Num lock',
  menu: 'Menu', up: 'Up arrow', down: 'Down arrow', left: 'Left arrow', right: 'Right arrow',
};

export { ARIA_KEY_NAMES };
