/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import type { PlacedPiece } from './pelago.type';
import { PELAGO_THREAD } from './pelago-thread.constants';
import { pieceBounds } from './piece-bounds';
import { pointText } from './point-text';
import { threadControl } from './thread-control';

const threadPiece = (name: string, from: ScenePoint, to: ScenePoint, bulge: number): PlacedPiece => {
  const [cx, cy] = threadControl(from, to, bulge);
  const length = Math.hypot(to[0] - from[0], to[1] - from[1]) || 1;
  const [nx, ny] = [(to[1] - from[1]) / length, (from[0] - to[0]) / length];
  const side = (width: number, sign: number): ScenePoint => [cx + nx * width * sign, cy + ny * width * sign];
  const widest = Math.max(...PELAGO_THREAD.map((l) => l.width));
  const corners = [from, to, side(widest, 1), side(widest, -1)];
  const { at, w, h } = pieceBounds(corners);
  const lens = (width: number): string =>
    `M${pointText(from, at)}Q${pointText(side(width, 1), at)} ${pointText(to, at)}Q${pointText(side(width, -1), at)} ${pointText(from, at)}Z`;
  return {
    at,
    piece: {
      name,
      w,
      h,
      paths: PELAGO_THREAD.map((layer) => ({ ink: layer.ink, opacity: layer.opacity, d: lens(layer.width) })),
    },
  };
};

export { threadPiece };
