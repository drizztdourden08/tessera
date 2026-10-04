/* @layer stories @kind data */
import type { InputIconFamily } from '../../src/primitives';

const INPUT_ICON_TITLES: Readonly<Record<InputIconFamily, string>> = {
  xbox: 'Xbox',
  playstation: 'PlayStation',
  switch: 'Nintendo Switch',
  gamecube: 'GameCube',
  snes: 'SNES, full colour art',
  generic: 'Generic controller',
  keyboard: 'Keyboard',
};

export { INPUT_ICON_TITLES };
