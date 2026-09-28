/* @layer renderer-components @kind util */
import { rectOf } from '../../KeyboardLayout';
import type { TourScene } from '../ShortcutTour.type';

const measureScene = (viewport: HTMLElement, world: HTMLElement, mouse: HTMLElement | null): TourScene => ({
  viewport: { width: viewport.clientWidth, height: viewport.clientHeight },
  world: { width: world.offsetWidth, height: world.offsetHeight },
  mouse: mouse ? rectOf(mouse) : null,
});

export { measureScene };
