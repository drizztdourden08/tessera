/* @layer renderer-components @kind constants */
import type { IconifyIcon } from '@iconify/types';
import mouse from '@iconify-icons/ph/mouse';
import mouseMiddleClick from '@iconify-icons/ph/mouse-middle-click';
import { layeredIcon } from '../behavior/layered-icon';

const OUTLINE = 'M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m48 160a48.05 48.05 0 0 1-48 48h-32a48.05 48.05 0 0 1-48-48V80a48.05 48.05 0 0 1 48-48h32a48.05 48.05 0 0 1 48 48Z';
const LEFT_BUTTON = 'M112 32h8v72H64V80a48.05 48.05 0 0 1 48-48Z';
const RIGHT_BUTTON = 'M136 32h8a48.05 48.05 0 0 1 48 48v24h-56Z';
const WHEEL_BLOCK = 'M120 72h16a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V88a16 16 0 0 1 16-16Z';
const WHEEL_LINE = 'M136 64v48a8 8 0 0 1-16 0V64a8 8 0 0 1 16 0';
const SCROLL = 'M136 83.31v89.38l10.34-10.35a8 8 0 0 1 11.32 11.32l-24 24a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L120 172.69V83.31l-10.34 10.35a8 8 0 0 1-11.32-11.32l24-24a8 8 0 0 1 11.32 0l24 24a8 8 0 0 1-11.32 11.32Z';
const ARROW_UP = 'M136 83.31V184a8 8 0 0 1-16 0V83.31l-10.34 10.35a8 8 0 0 1-11.32-11.32l24-24a8 8 0 0 1 11.32 0l24 24a8 8 0 0 1-11.32 11.32Z';
const ARROW_DOWN = 'M120 172.69V72a8 8 0 0 1 16 0v100.69l10.34-10.35a8 8 0 0 1 11.32 11.32l-24 24a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32Z';
const ARROW_LEFT = 'M104.97 168H176a8 8 0 0 1 0 16h-71.03l10.35 10.34a8 8 0 0 1-11.32 11.32l-24-24a8 8 0 0 1 0-11.32l24-24a8 8 0 0 1 11.32 11.32Z';
const ARROW_RIGHT = 'M151.03 184H80a8 8 0 0 1 0-16h71.03l-10.35-10.34a8 8 0 0 1 11.32-11.32l24 24a8 8 0 0 1 0 11.32l-24 24a8 8 0 0 1-11.32-11.32Z';
const FRONT_PRESSED = 'M22 96a12 12 0 0 1 12 12v24a12 12 0 0 1-24 0v-24a12 12 0 0 1 12-12Z';
const REAR_PRESSED = 'M22 152a12 12 0 0 1 12 12v24a12 12 0 0 1-24 0v-24a12 12 0 0 1 12-12Z';
const FRONT_IDLE = 'M22 96a4 4 0 0 1 4 4v40a4 4 0 0 1-8 0v-40a4 4 0 0 1 4-4Z';
const REAR_IDLE = 'M22 152a4 4 0 0 1 4 4v40a4 4 0 0 1-8 0v-40a4 4 0 0 1 4-4Z';

const pathsOf = (icon: IconifyIcon): string[] => [...icon.body.matchAll(/ d="([^"]+)"/g)].map((match) => match[1] ?? '');

const BUTTONS = pathsOf(mouse);

const MOUSE_SPECS = {
  left: { name: 'Left click', icon: layeredIcon({ base: BUTTONS, press: [LEFT_BUTTON] }) },
  right: { name: 'Right click', icon: layeredIcon({ base: BUTTONS, press: [RIGHT_BUTTON] }) },
  middle: { name: 'Middle click', icon: layeredIcon({ base: pathsOf(mouseMiddleClick), press: [WHEEL_BLOCK] }) },
  wheel: { name: 'Scroll wheel', icon: layeredIcon({ base: [OUTLINE], press: [SCROLL] }) },
  'wheel-up': { name: 'Scroll up', icon: layeredIcon({ base: [OUTLINE], press: [ARROW_UP] }) },
  'wheel-down': { name: 'Scroll down', icon: layeredIcon({ base: [OUTLINE], press: [ARROW_DOWN] }) },
  'wheel-left': { name: 'Tilt wheel left', icon: layeredIcon({ base: [OUTLINE], press: [WHEEL_LINE, ARROW_LEFT] }) },
  'wheel-right': { name: 'Tilt wheel right', icon: layeredIcon({ base: [OUTLINE], press: [WHEEL_LINE, ARROW_RIGHT] }) },
  back: { name: 'Back button', icon: layeredIcon({ base: [...BUTTONS, FRONT_IDLE], press: [REAR_PRESSED, ARROW_LEFT] }) },
  forward: { name: 'Forward button', icon: layeredIcon({ base: [...BUTTONS, REAR_IDLE], press: [FRONT_PRESSED, ARROW_RIGHT] }) },
  any: { name: 'Any mouse button', icon: layeredIcon({ base: BUTTONS, press: [LEFT_BUTTON, RIGHT_BUTTON] }) },
} as const;

export { MOUSE_SPECS };
