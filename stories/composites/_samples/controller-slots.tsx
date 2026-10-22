/* @layer stories @kind util */
import type { ControllerLayoutVariant, ControllerSlotId, ControllerSlots } from '../../../src/composites';
import type { InputIconFamily } from '../../../src/primitives';
import { InputIcon, gamepadInputIcon } from '../../../src/primitives';

const SDL_IDS: Partial<Record<ControllerSlotId, string>> = {
  'face.south': 'a', 'face.east': 'b', 'face.west': 'x', 'face.north': 'y',
  'dpad.up': 'dpup', 'dpad.down': 'dpdown', 'dpad.left': 'dpleft', 'dpad.right': 'dpright',
  'shoulder.left': 'leftshoulder', 'shoulder.right': 'rightshoulder',
  'trigger.left': 'lefttrigger', 'trigger.right': 'righttrigger',
  'stick.left.click': 'leftstick', 'stick.right.click': 'rightstick',
  'meta.view': 'back', 'meta.menu': 'start', 'meta.guide': 'guide', 'meta.capture': 'misc1',
};

const FAMILY_OF: Record<ControllerLayoutVariant, InputIconFamily> = {
  offset: 'xbox', symmetric: 'playstation', nintendo: 'switch', pad: 'snes',
};

const BUTTON_IDS: readonly ControllerSlotId[] = [
  'face.south', 'face.east', 'face.west', 'face.north', 'dpad.up', 'dpad.right', 'dpad.down', 'dpad.left',
  'shoulder.left', 'shoulder.right', 'meta.view', 'meta.menu', 'meta.guide', 'stick.left.click', 'stick.right.click',
];

const glyphFor = (family: InputIconFamily, id: ControllerSlotId) => {
  const sdl = SDL_IDS[id];
  const source = sdl ? gamepadInputIcon(family, sdl) : null;
  return source ? <InputIcon {...source} size={16} tone="theme" /> : undefined;
};

const labelledSlots = (variant: ControllerLayoutVariant, held: readonly ControllerSlotId[] = []): ControllerSlots => {
  const family = FAMILY_OF[variant];
  const down = new Set(held);
  const entries = (Object.keys(SDL_IDS) as ControllerSlotId[])
    .map((id) => [id, { glyph: glyphFor(family, id), pressed: down.has(id) }] as const)
    .filter(([, state]) => state.glyph !== undefined);
  return Object.fromEntries(entries) as ControllerSlots;
};

export { BUTTON_IDS, labelledSlots };
