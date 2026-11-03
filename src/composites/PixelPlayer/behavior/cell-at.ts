/* @layer renderer-components @kind util */
import type { PixelPlayerCell } from '../PixelPlayer.type';

const cellAt = (cells: readonly PixelPlayerCell[], x: number, y: number): PixelPlayerCell | null =>
  cells.find((cell) => x >= cell.x && x < cell.x + cell.width && y >= cell.y && y < cell.y + cell.height) ?? null;

export { cellAt };
