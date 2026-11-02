/* @layer renderer-components @kind data */
import type { PaletteRoom } from './PointerPalette.type';

const PALETTE_ROOM: PaletteRoom = { width: 320, height: 360 };

const POINT_GAP = 6;

const DEFAULT_COLUMNS = 4;

const ENTRY_SELECTOR = '[role="option"][tabindex="0"]';

export { DEFAULT_COLUMNS, ENTRY_SELECTOR, PALETTE_ROOM, POINT_GAP };
