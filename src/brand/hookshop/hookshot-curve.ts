/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';
import { turnPoint } from '../scene/turn-point';
import { ORIGIN } from './hookshop.constants';
import { HOOKSHOT_RIG } from './hookshot-rig.constants';
import type { HookshotCurve } from './hookshop.type';

const add = (a: ScenePoint, b: ScenePoint): ScenePoint => [a[0] + b[0], a[1] + b[1]];
const reach = (length: number, deg: number): ScenePoint => turnPoint([length, 0], ORIGIN, deg);

const hookshotCurve = (grip: ScenePoint, angle: number, length: number, bend: number): HookshotCurve => {
  const { grip: g, muzzle: m } = HOOKSHOT_RIG.handle;
  const start = add(grip, turnPoint([m[0] - g[0], m[1] - g[1]], ORIGIN, angle));
  const end = add(start, reach(length, angle + bend / 2));
  return [start, add(start, reach(length / 3, angle)), add(end, reach(-length / 3, angle + bend)), end];
};

export { hookshotCurve };
