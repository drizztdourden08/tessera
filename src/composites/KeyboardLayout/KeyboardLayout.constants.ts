/* @layer renderer-components @kind constants */
import { buildLayout } from './behavior/build-layout';
import { slotsOf } from './behavior/slots-of';
import type { KeyboardSize, KeyRow, KeyZone } from './KeyboardLayout.type';

const KEYBOARD_SIZES = ['full', 'tenkeyless'] as const;

const KEYBOARD_LABEL = 'Keyboard';

const SIZE_ZONES: Record<KeyboardSize, readonly KeyZone[]> = {
  full: ['function', 'main', 'navigation', 'arrows', 'numpad'],
  tenkeyless: ['function', 'main', 'navigation', 'arrows'],
};

const FUNCTION_ROWS: readonly KeyRow[] = [
  {
    zone: 'function', x: 0, y: 0,
    slots: [
      { id: 'esc' }, { id: 'F1', gap: 1 }, { id: 'F2' }, { id: 'F3' }, { id: 'F4' },
      { id: 'F5', gap: 0.5 }, { id: 'F6' }, { id: 'F7' }, { id: 'F8' },
      { id: 'F9', gap: 0.5 }, { id: 'F10' }, { id: 'F11' }, { id: 'F12' },
    ],
  },
  {
    zone: 'navigation', x: 15.25, y: 0,
    slots: [{ id: 'printscreen' }, { id: 'scrolllock', legend: 'ScrLk', spoken: 'Scroll lock' }, { id: 'pause', legend: 'Pause' }],
  },
];

const MAIN_ROWS: readonly KeyRow[] = [
  { zone: 'main', x: 0, y: 1.5, slots: [...slotsOf('`1234567890-=', '~!@#$%^&*()_+'), { id: 'backspace', w: 2 }] },
  {
    zone: 'main', x: 0, y: 2.5,
    slots: [{ id: 'tab', w: 1.5 }, ...slotsOf('QWERTYUIOP[]', '          {}'), { id: '\\', also: ['|'], w: 1.5 }],
  },
  {
    zone: 'main', x: 0, y: 3.5,
    slots: [{ id: 'capslock', w: 1.75 }, ...slotsOf('ASDFGHJKL;\'', '         :"'), { id: 'enter', w: 2.25 }],
  },
  {
    zone: 'main', x: 0, y: 4.5,
    slots: [
      { id: 'shift-left', as: 'shift', w: 2.25 }, ...slotsOf('ZXCVBNM,./', '       <>?'),
      { id: 'shift-right', as: 'shift', w: 2.75 },
    ],
  },
  {
    zone: 'main', x: 0, y: 5.5,
    slots: [
      { id: 'ctrl-left', as: 'ctrl', w: 1.25 }, { id: 'win-left', as: 'win', also: ['cmd'], w: 1.25 },
      { id: 'alt-left', as: 'alt', also: ['option'], w: 1.25 }, { id: 'space', w: 6.25 },
      { id: 'alt-right', as: 'alt', also: ['option'], w: 1.25 }, { id: 'win-right', as: 'win', also: ['cmd'], w: 1.25 },
      { id: 'menu', legend: 'Menu', w: 1.25 }, { id: 'ctrl-right', as: 'ctrl', w: 1.25 },
    ],
  },
];

const CLUSTER_ROWS: readonly KeyRow[] = [
  { zone: 'navigation', x: 15.25, y: 1.5, slots: [{ id: 'insert' }, { id: 'home' }, { id: 'pageup' }] },
  { zone: 'navigation', x: 15.25, y: 2.5, slots: [{ id: 'delete' }, { id: 'end' }, { id: 'pagedown' }] },
  { zone: 'arrows', x: 16.25, y: 4.5, slots: [{ id: 'up' }] },
  { zone: 'arrows', x: 15.25, y: 5.5, slots: [{ id: 'left' }, { id: 'down' }, { id: 'right' }] },
];

const NUMPAD_ROWS: readonly KeyRow[] = [
  {
    zone: 'numpad', x: 18.5, y: 1.5,
    slots: [
      { id: 'numlock', legend: 'Num', spoken: 'Num lock' }, { id: 'numpad-divide', legend: '/' },
      { id: 'numpad-times', legend: '*' }, { id: 'numpad-minus', legend: '-' },
    ],
  },
  {
    zone: 'numpad', x: 18.5, y: 2.5,
    slots: [
      { id: 'numpad-7', legend: '7' }, { id: 'numpad-8', legend: '8' }, { id: 'numpad-9', legend: '9' },
      { id: 'numpad-plus', legend: '+', h: 2 },
    ],
  },
  {
    zone: 'numpad', x: 18.5, y: 3.5,
    slots: [{ id: 'numpad-4', legend: '4' }, { id: 'numpad-5', legend: '5' }, { id: 'numpad-6', legend: '6' }],
  },
  {
    zone: 'numpad', x: 18.5, y: 4.5,
    slots: [
      { id: 'numpad-1', legend: '1' }, { id: 'numpad-2', legend: '2' }, { id: 'numpad-3', legend: '3' },
      { id: 'numpad-enter', legend: 'Enter', h: 2 },
    ],
  },
  { zone: 'numpad', x: 18.5, y: 5.5, slots: [{ id: 'numpad-0', legend: '0', w: 2 }, { id: 'numpad-dot', legend: '.' }] },
];

const KEYBOARD_KEYS = buildLayout([...FUNCTION_ROWS, ...MAIN_ROWS, ...CLUSTER_ROWS, ...NUMPAD_ROWS]);

export { KEYBOARD_KEYS, KEYBOARD_LABEL, KEYBOARD_SIZES, SIZE_ZONES };
