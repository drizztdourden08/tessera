/* @layer renderer-components @kind logic */
import { POP_MARGIN } from '../DockLayout.constants';
import type { PointerPlace } from './drag.type';

const isOutside = (place: PointerPlace): boolean => {
  const { client, onScreen, view } = place;
  if (client.x < -POP_MARGIN || client.y < -POP_MARGIN) return true;
  if (client.x > view.innerWidth + POP_MARGIN || client.y > view.innerHeight + POP_MARGIN) return true;
  const display = view.screen as Screen & { availLeft?: number; availTop?: number };
  const left = display.availLeft ?? 0;
  const top = display.availTop ?? 0;
  return onScreen.x <= left || onScreen.y <= top
    || onScreen.x >= left + display.width - 1 || onScreen.y >= top + display.height - 1;
};

export { isOutside };
