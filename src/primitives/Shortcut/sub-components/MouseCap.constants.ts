/* @layer renderer-components @kind constants */
import type { IconifyIcon } from '@iconify/types';
import mouse from '@iconify-icons/ph/mouse';
import mouseLeftClick from '@iconify-icons/ph/mouse-left-click';
import mouseMiddleClick from '@iconify-icons/ph/mouse-middle-click';
import mouseRightClick from '@iconify-icons/ph/mouse-right-click';
import mouseScroll from '@iconify-icons/ph/mouse-scroll';

const OUTLINE = 'M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m48 160a48.05 48.05 0 0 1-48 48h-32a48.05 48.05 0 0 1-48-48V80a48.05 48.05 0 0 1 48-48h32a48.05 48.05 0 0 1 48 48Z';
const WHEEL = 'M136 64v48a8 8 0 0 1-16 0V64a8 8 0 0 1 16 0';
const ARROW_UP = 'M136 83.31V184a8 8 0 0 1-16 0V83.31l-10.34 10.35a8 8 0 0 1-11.32-11.32l24-24a8 8 0 0 1 11.32 0l24 24a8 8 0 0 1-11.32 11.32Z';
const ARROW_DOWN = 'M120 172.69V72a8 8 0 0 1 16 0v100.69l10.34-10.35a8 8 0 0 1 11.32 11.32l-24 24a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32Z';
const ARROW_LEFT = 'M104.97 168H176a8 8 0 0 1 0 16h-71.03l10.35 10.34a8 8 0 0 1-11.32 11.32l-24-24a8 8 0 0 1 0-11.32l24-24a8 8 0 0 1 11.32 11.32Z';
const ARROW_RIGHT = 'M151.03 184H80a8 8 0 0 1 0-16h71.03l-10.35-10.34a8 8 0 0 1 11.32-11.32l24 24a8 8 0 0 1 0 11.32l-24 24a8 8 0 0 1-11.32-11.32Z';
const FRONT_PRESSED = 'M22 96a12 12 0 0 1 12 12v24a12 12 0 0 1-24 0v-24a12 12 0 0 1 12-12Z';
const REAR_PRESSED = 'M22 152a12 12 0 0 1 12 12v24a12 12 0 0 1-24 0v-24a12 12 0 0 1 12-12Z';
const FRONT_IDLE = 'M22 96a4 4 0 0 1 4 4v40a4 4 0 0 1-8 0v-40a4 4 0 0 1 4-4Z';
const REAR_IDLE = 'M22 152a4 4 0 0 1 4 4v40a4 4 0 0 1-8 0v-40a4 4 0 0 1 4-4Z';

const pathsOf = (icon: IconifyIcon): string[] => [...icon.body.matchAll(/ d="([^"]+)"/g)].map((match) => match[1] ?? '');

const phosphorIcon = (...paths: string[]): IconifyIcon => ({
  width: 256,
  height: 256,
  body: paths.map((d) => `<path fill="currentColor" d="${d}"/>`).join(''),
});

const SPLIT_BODY = pathsOf(mouse);

const MOUSE_SPECS = {
  left: { name: 'Left click', icon: mouseLeftClick },
  right: { name: 'Right click', icon: mouseRightClick },
  middle: { name: 'Middle click', icon: mouseMiddleClick },
  wheel: { name: 'Scroll wheel', icon: mouseScroll },
  'wheel-up': { name: 'Scroll up', icon: phosphorIcon(OUTLINE, ARROW_UP) },
  'wheel-down': { name: 'Scroll down', icon: phosphorIcon(OUTLINE, ARROW_DOWN) },
  'wheel-left': { name: 'Tilt wheel left', icon: phosphorIcon(OUTLINE, WHEEL, ARROW_LEFT) },
  'wheel-right': { name: 'Tilt wheel right', icon: phosphorIcon(OUTLINE, WHEEL, ARROW_RIGHT) },
  back: { name: 'Back button', icon: phosphorIcon(...SPLIT_BODY, REAR_PRESSED, FRONT_IDLE, ARROW_LEFT) },
  forward: { name: 'Forward button', icon: phosphorIcon(...SPLIT_BODY, FRONT_PRESSED, REAR_IDLE, ARROW_RIGHT) },
  any: { name: 'Any mouse button', icon: mouse },
} as const;

export { MOUSE_SPECS };
