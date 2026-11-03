/* @layer renderer-components @kind util */
import { OUTLINE_WIDTH } from '../PixelPlayer.constants';
import type { PixelPlayerCell } from '../PixelPlayer.type';

const drawOutline = (canvas: HTMLCanvasElement, cell: PixelPlayerCell, zoom: number): void => {
  const context = canvas.getContext('2d');
  if (!context) return;
  const inset = OUTLINE_WIDTH / 2;
  context.lineWidth = OUTLINE_WIDTH;
  context.strokeStyle = canvas.ownerDocument.defaultView?.getComputedStyle(canvas).color ?? '';
  context.strokeRect(cell.x * zoom + inset, cell.y * zoom + inset, cell.width * zoom - OUTLINE_WIDTH, cell.height * zoom - OUTLINE_WIDTH);
};

export { drawOutline };
