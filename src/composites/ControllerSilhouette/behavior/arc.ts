/* @layer renderer-components @kind logic */
import { ARC_PIECE, DEGREE, QUARTER_TURN_K } from './path.constants';
import type { Cubic } from '../ControllerSilhouette.type';

const piece = (cx: number, cy: number, r: number, from: number, to: number): Cubic => {
  const a = from * DEGREE;
  const b = to * DEGREE;
  const k = QUARTER_TURN_K * Math.tan((b - a) / 4) * r;
  const ex = cx + r * Math.cos(b);
  const ey = cy + r * Math.sin(b);
  return [
    cx + r * Math.cos(a) - k * Math.sin(a), cy + r * Math.sin(a) + k * Math.cos(a),
    ex + k * Math.sin(b), ey - k * Math.cos(b),
    ex, ey,
  ];
};

const arc = (cx: number, cy: number, r: number, from: number, to: number): Cubic[] => {
  const count = Math.max(1, Math.ceil(Math.abs(to - from) / ARC_PIECE));
  const step = (to - from) / count;
  return Array.from({ length: count }, (_, index) => piece(cx, cy, r, from + step * index, from + step * (index + 1)));
};

export { arc };
