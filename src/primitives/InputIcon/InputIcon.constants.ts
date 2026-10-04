/* @layer renderer-components @kind data */
import { GAMECUBE_INPUT_ICONS } from '../icon-sets/input-gamecube.constants';
import { GENERIC_INPUT_ICONS } from '../icon-sets/input-generic.constants';
import { KEYBOARD_INPUT_ICONS } from '../icon-sets/input-keyboard.constants';
import { PLAYSTATION_INPUT_ICONS } from '../icon-sets/input-playstation.constants';
import { SNES_INPUT_ICONS } from '../icon-sets/input-snes.constants';
import { SWITCH_INPUT_ICONS } from '../icon-sets/input-switch.constants';
import { XBOX_INPUT_ICONS } from '../icon-sets/input-xbox.constants';
import type { InputIconFamily, InputIconSet } from './InputIcon.type';

const INPUT_ICONS = {
  xbox: XBOX_INPUT_ICONS,
  playstation: PLAYSTATION_INPUT_ICONS,
  switch: SWITCH_INPUT_ICONS,
  gamecube: GAMECUBE_INPUT_ICONS,
  snes: SNES_INPUT_ICONS,
  generic: GENERIC_INPUT_ICONS,
  keyboard: KEYBOARD_INPUT_ICONS,
} as const satisfies { readonly [F in InputIconFamily]: InputIconSet<F> };

const INPUT_ICON_GRID = 64;

export { INPUT_ICON_GRID, INPUT_ICONS };
