/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { HALF_LID } from './half-lid.constants';
import type { PathStep } from './pelago-symbol.type';
import { polySteps } from './poly-steps';

const { rx: RX, ry: RY, band: BAND } = HALF_LID;

const round = (n: number): number => Number(n.toFixed(3));

const edge = ([ex, ey]: ScenePoint, height: number, side: number): ScenePoint =>
  [round(ex + side * RX * Math.sqrt(1 - (height / RY) ** 2)), round(ey + height)];

const halfLid = (eye: ScenePoint, outer: number, inner: number, mirror: boolean): { patch: readonly PathStep[]; band: readonly PathStep[] } => {
  const [left, right] = mirror ? [inner, outer] : [outer, inner];
  const from = edge(eye, left, -1);
  const to = edge(eye, right, 1);
  const large = left + right > 0 ? 1 : 0;
  return {
    patch: [['M', ...from], ['A', RX, RY, large, 1, ...to], ['Z']],
    band: polySteps([from, to, [to[0], to[1] + BAND], [from[0], from[1] + BAND]]),
  };
};

export { halfLid };
