/* @layer renderer-components @kind data */
import type { INPUT_ICON_FAMILIES } from './input-icon-families.constants';

const DPAD = ['dpad-down', 'dpad-left', 'dpad-right', 'dpad-up'] as const;

const LETTERED_STICKS = [
  'stick-l', 'stick-l-down', 'stick-l-horizontal', 'stick-l-left', 'stick-l-press', 'stick-l-right', 'stick-l-up', 'stick-l-vertical',
  'stick-r', 'stick-r-down', 'stick-r-horizontal', 'stick-r-left', 'stick-r-press', 'stick-r-right', 'stick-r-vertical',
] as const;

const INPUT_ICON_NAMES = {
  xbox: [
    'controller', 'a', 'b', 'menu', 'share', 'view', 'x', 'y', 'guide', 'lb', 'ls', 'lt', 'rb', 'rs', 'rt', 'stick-r-up',
    ...DPAD, ...LETTERED_STICKS,
  ],
  playstation: [
    'controller', 'create', 'options', 'circle', 'cross', 'l3', 'r3', 'square', 'triangle', ...DPAD,
    'stick-l', 'stick-l-press', 'stick-r', 'stick-r-press', 'l1', 'l2', 'r1', 'r2',
  ],
  switch: [
    'controller', 'a', 'b', 'c', 'capture', 'gl', 'gr', 'home', 'l', 'minus', 'plus', 'r', 'x', 'y', 'zl', 'zr', ...DPAD,
    'stick-r-up', ...LETTERED_STICKS,
  ],
  gamecube: [
    'controller', 'a', 'b', 'capture', 'c', 'home', 'start', 'x', 'y', 'z', ...DPAD,
    'stick-c', 'stick-c-down', 'stick-c-horizontal', 'stick-c-left', 'stick-c-right', 'stick-c-up', 'stick-c-vertical',
    'stick-l', 'stick-l-down', 'stick-l-horizontal', 'stick-l-left', 'stick-l-right', 'stick-l-up', 'stick-l-vertical', 'l', 'r',
  ],
  snes: ['a', 'b', 'dpad', ...DPAD, 'l', 'r', 'select', 'start', 'x', 'y'],
  generic: [
    'dpad', ...DPAD, 'button', 'button-circle', 'button-circle-fill', 'button-circle-outline', 'button-finger', 'button-finger-pressed',
    'button-pressed', 'button-square', 'button-square-fill', 'button-square-outline',
    'button-trigger-a', 'button-trigger-a-fill', 'button-trigger-a-outline', 'button-trigger-b', 'button-trigger-b-fill',
    'button-trigger-b-outline', 'button-trigger-c', 'button-trigger-c-fill', 'button-trigger-c-outline',
    'joystick', 'joystick-horizontal', 'joystick-left', 'joystick-right', 'joystick-highlight', 'joystick-highlight-horizontal',
    'joystick-highlight-left', 'joystick-highlight-right',
    'stick', 'stick-down', 'stick-horizontal', 'stick-left', 'stick-press', 'stick-right', 'stick-side', 'stick-up', 'stick-vertical',
  ],
  keyboard: [
    'keyboard', 'any', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12',
    'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'space', 'space-icon', 'enter', 'return', 'numpad-enter', 'tab', 'tab-icon',
    'escape', 'backspace', 'backspace-icon', 'shift', 'shift-icon', 'ctrl', 'alt', 'option', 'command', 'win', 'function',
    'capslock', 'capslock-icon', 'delete', 'insert', 'home', 'end', 'page-up', 'page-down',
    'printscreen', 'pause', 'pause-break', 'scroll-lock', 'numlock', 'numpad-plus',
    'apostrophe', 'asterisk', 'bracket-close', 'bracket-greater', 'bracket-less', 'bracket-open', 'caret', 'colon', 'comma', 'equals',
    'exclamation', 'minus', 'period', 'plus', 'question', 'quote', 'semicolon', 'slash-back', 'slash-forward', 'tilde', 'underscore',
  ],
} as const satisfies Readonly<Record<(typeof INPUT_ICON_FAMILIES)[number], readonly string[]>>;

export { INPUT_ICON_NAMES };
