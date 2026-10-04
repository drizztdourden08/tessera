/* @layer renderer-components @kind data */
import type { GamepadIcons } from '../InputIcon.type';

const DPAD = { dpup: 'dpad-up', dpdown: 'dpad-down', dpleft: 'dpad-left', dpright: 'dpad-right' } as const;

const STICK_PRESS = { leftstick: 'stick-l-press', rightstick: 'stick-r-press' } as const;

const GAMEPAD_INPUT_ICONS: GamepadIcons = {
  xbox: {
    a: 'a', b: 'b', x: 'x', y: 'y', back: 'view', guide: 'guide', start: 'menu', misc1: 'share',
    leftshoulder: 'lb', rightshoulder: 'rb', lefttrigger: 'lt', righttrigger: 'rt', ...STICK_PRESS, ...DPAD,
  },
  playstation: {
    a: 'cross', b: 'circle', x: 'square', y: 'triangle', back: 'create', start: 'options',
    leftshoulder: 'l1', rightshoulder: 'r1', lefttrigger: 'l2', righttrigger: 'r2', leftstick: 'l3', rightstick: 'r3', ...DPAD,
  },
  switch: {
    a: 'b', b: 'a', x: 'y', y: 'x', back: 'minus', guide: 'home', start: 'plus', misc1: 'capture', misc2: 'c',
    leftshoulder: 'l', rightshoulder: 'r', lefttrigger: 'zl', righttrigger: 'zr', paddle1: 'gr', paddle2: 'gl', ...STICK_PRESS, ...DPAD,
  },
  gamecube: {
    a: 'a', b: 'x', x: 'b', y: 'y', guide: 'home', start: 'start', misc1: 'capture', misc2: 'c',
    leftshoulder: 'l', rightshoulder: 'z', lefttrigger: 'l', righttrigger: 'r', ...DPAD,
  },
  snes: { a: 'b', b: 'a', x: 'y', y: 'x', back: 'select', start: 'start', leftshoulder: 'l', rightshoulder: 'r', ...DPAD },
  generic: {
    a: 'button', b: 'button-circle', x: 'button-square', y: 'button', back: 'button', guide: 'button', start: 'button',
    misc1: 'button', touchpad: 'button-square', leftshoulder: 'button-trigger-a', rightshoulder: 'button-trigger-b',
    lefttrigger: 'button-trigger-a', righttrigger: 'button-trigger-b', paddle1: 'button-trigger-b', paddle2: 'button-trigger-a',
    paddle3: 'button-trigger-b', paddle4: 'button-trigger-a', leftstick: 'stick-press', rightstick: 'stick-press',
    ...DPAD,
  },
  keyboard: {
    ArrowUp: 'arrow-up', ArrowDown: 'arrow-down', ArrowLeft: 'arrow-left', ArrowRight: 'arrow-right',
    Space: 'space-icon', Enter: 'enter', NumpadEnter: 'numpad-enter', Tab: 'tab-icon', Escape: 'escape', Backspace: 'backspace-icon',
    ShiftLeft: 'shift-icon', ShiftRight: 'shift-icon', ControlLeft: 'ctrl', ControlRight: 'ctrl', AltLeft: 'alt', AltRight: 'alt',
    MetaLeft: 'win', MetaRight: 'win', CapsLock: 'capslock-icon', Delete: 'delete', Insert: 'insert', Home: 'home', End: 'end',
    PageUp: 'page-up', PageDown: 'page-down', Comma: 'comma', Period: 'period', Semicolon: 'semicolon', Quote: 'quote',
    Slash: 'slash-forward', Backslash: 'slash-back', Minus: 'minus', Equal: 'equals', BracketLeft: 'bracket-open',
    BracketRight: 'bracket-close', Backquote: 'tilde', NumpadAdd: 'numpad-plus', PrintScreen: 'printscreen', Pause: 'pause',
    ScrollLock: 'scroll-lock', NumLock: 'numlock',
  },
};

export { GAMEPAD_INPUT_ICONS };
