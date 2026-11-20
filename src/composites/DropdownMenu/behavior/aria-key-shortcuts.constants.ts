/* @layer renderer-components @kind constants */
import type { KeyName } from '../../../primitives/Shortcut';

const ARIA_KEY_NAMES: Record<KeyName, string> = {
  ctrl: 'Control', alt: 'Alt', option: 'Alt', shift: 'Shift', cmd: 'Meta', win: 'Meta', fn: 'Fn', enter: 'Enter', tab: 'Tab',
  backspace: 'Backspace', delete: 'Delete', esc: 'Escape', capslock: 'CapsLock', space: 'Space', insert: 'Insert', home: 'Home', end: 'End',
  pageup: 'PageUp', pagedown: 'PageDown', printscreen: 'PrintScreen', scrolllock: 'ScrollLock', pause: 'Pause', numlock: 'NumLock',
  menu: 'ContextMenu', up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight',
};

export { ARIA_KEY_NAMES };
