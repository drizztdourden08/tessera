/* @layer renderer-components @kind logic */
const EPSILON = 1e-7;
const NEWTON_STEPS = 8;
const BISECT_STEPS = 40;

const cubicBezier = (x1: number, y1: number, x2: number, y2: number): ((t: number) => number) => {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const curveX = (t: number): number => ((ax * t + bx) * t + cx) * t;
  const curveY = (t: number): number => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number): number => (3 * ax * t + 2 * bx) * t + cx;
  const solveX = (x: number): number => {
    let t = x;
    for (let i = 0; i < NEWTON_STEPS; i += 1) {
      const error = curveX(t) - x;
      if (Math.abs(error) < EPSILON) return t;
      const slope = slopeX(t);
      if (Math.abs(slope) < EPSILON) break;
      t -= error / slope;
    }
    let low = 0;
    let high = 1;
    t = x;
    for (let i = 0; i < BISECT_STEPS && high - low > EPSILON; i += 1) {
      if (curveX(t) < x) low = t;
      else high = t;
      t = (low + high) / 2;
    }
    return t;
  };
  return (x: number): number => (x <= 0 ? 0 : x >= 1 ? 1 : curveY(solveX(x)));
};

export { cubicBezier };
