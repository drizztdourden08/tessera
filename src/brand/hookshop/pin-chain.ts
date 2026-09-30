/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { CHAIN_SAMPLES, SEARCH_STEPS } from './hookshop.constants';
import type { ChainCursor, HookshotCurve } from './hookshop.type';

const bezierAt = ([p0, p1, p2, p3]: HookshotCurve, t: number): ScenePoint => {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
};

const distance = (a: ScenePoint, b: ScenePoint): number => Math.hypot(b[0] - a[0], b[1] - a[1]);
const between = (a: ScenePoint, b: ScenePoint, t: number): ScenePoint => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

const searchStep = (from: ScenePoint, start: ScenePoint, end: ScenePoint, step: number): number => {
  let lo = 0, hi = 1;
  for (let k = 0; k < SEARCH_STEPS; k++) {
    const mid = (lo + hi) / 2;
    if (distance(from, between(start, end, mid)) < step) lo = mid;
    else hi = mid;
  }
  return hi;
};

const nextPin = (line: readonly ScenePoint[], from: ChainCursor, step: number): ChainCursor | null => {
  for (let i = from.segment; i < line.length - 1; i++) {
    const end = line[i + 1] ?? from.point;
    if (distance(from.point, end) < step) continue;
    const start = i === from.segment ? from.point : line[i] ?? from.point;
    return { point: between(start, end, searchStep(from.point, start, end, step)), segment: i };
  }
  return null;
};

const walk = (line: readonly ScenePoint[], step: number, count: number): ScenePoint[] | null => {
  const first = line[0] ?? [0, 0];
  const pins: ScenePoint[] = [first];
  let cursor: ChainCursor | null = { point: first, segment: 0 };
  for (let i = 0; i < count && cursor; i++) {
    cursor = nextPin(line, cursor, step);
    if (cursor) pins.push(cursor.point);
  }
  return cursor ? pins : null;
};

const pinChain = (curve: HookshotCurve, pitch: number): ScenePoint[] => {
  const line = Array.from({ length: CHAIN_SAMPLES + 1 }, (_, i) => bezierAt(curve, i / CHAIN_SAMPLES));
  const length = line.slice(1).reduce((sum, p, i) => sum + distance(line[i] ?? p, p), 0);
  const count = Math.max(1, Math.round(length / pitch));
  let lo = pitch * 0.5, hi = pitch * 1.5;
  for (let k = 0; k < SEARCH_STEPS; k++) {
    const mid = (lo + hi) / 2;
    if (walk(line, mid, count)) lo = mid;
    else hi = mid;
  }
  const pins = walk(line, lo, count) ?? [curve[0]];
  pins[pins.length - 1] = curve[3];
  return pins;
};

export { pinChain };
