/* @layer stories @kind data */
import type { PressedGridItem } from '../../../src/composites';

const GAMEPAD_BUTTONS: readonly PressedGridItem[] = [
  { id: 'a', label: 'A' },
  { id: 'b', label: 'B' },
  { id: 'x', label: 'X' },
  { id: 'y', label: 'Y' },
  { id: 'back', label: 'Back' },
  { id: 'guide', label: 'Guide' },
  { id: 'start', label: 'Start' },
  { id: 'leftstick', label: 'L3' },
  { id: 'rightstick', label: 'R3' },
  { id: 'leftshoulder', label: 'LB' },
  { id: 'rightshoulder', label: 'RB' },
  { id: 'dpup', label: 'Up' },
  { id: 'dpdown', label: 'Down' },
  { id: 'dpleft', label: 'Left' },
  { id: 'dpright', label: 'Right' },
  { id: 'misc1', label: 'Share' },
];

const PRESS_SEQUENCE: readonly (readonly string[])[] = [
  ['a'], [], ['b'], [], ['x', 'y'], [], ['dpup'], ['dpright'], ['dpdown'], ['dpleft'], [],
  ['leftshoulder', 'rightshoulder'], [], ['start'], [], ['leftstick'], ['rightstick'], [],
];

export { GAMEPAD_BUTTONS, PRESS_SEQUENCE };
