/* @layer renderer-components @kind logic */
import { ARC_PIECE, DEGREE, QUARTER_TURN_K } from './path.constants';
import type { ArcSpec, Cubic } from '../ControllerSilhouette.type';

const piece = (spec: ArcSpec): Cubic => {
  const { cx, cy, r, from, to } = spec;
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

const arc = (spec: ArcSpec): Cubic[] => {
  const { from, to } = spec;
  const count = Math.max(1, Math.ceil(Math.abs(to - from) / ARC_PIECE));
  const step = (to - from) / count;
  return Array.from({ length: count }, (_, index) => piece({ ...spec, from: from + step * index, to: from + step * (index + 1) }));
};

export { arc };
