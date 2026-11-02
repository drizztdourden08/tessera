/* @layer renderer-components @kind logic */
import { PALETTE_ROOM, POINT_GAP } from '../PointerPalette.constants';
import type { PaletteAnchor, PalettePoint, PaletteRoom } from '../PointerPalette.type';

const paletteAnchor = (point: PalettePoint, view: PaletteRoom, room: PaletteRoom = PALETTE_ROOM): PaletteAnchor => {
  const after = { width: view.width - point.x, height: view.height - point.y };
  const flipX = after.width < room.width && point.x > after.width;
  const flipY = after.height < room.height && point.y > after.height;
  return {
    ...(flipX ? { right: after.width + POINT_GAP } : { left: point.x + POINT_GAP }),
    ...(flipY ? { bottom: after.height + POINT_GAP } : { top: point.y + POINT_GAP }),
  };
};

export { paletteAnchor };
