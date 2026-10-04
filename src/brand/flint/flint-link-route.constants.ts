/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';
import { smoothRoute } from '../motion/smooth-route';

const CHIP: ScenePoint = [28.6, 4.5];
const LEFT_HAND: ScenePoint = [4.2, 15.6];
const RIGHT_HAND: ScenePoint = [36.3, 15.6];
const STEPS = 3;

const FLINT_LINK_ROUTE = {
  chip: CHIP,
  leftHand: LEFT_HAND,
  overHead: smoothRoute([LEFT_HAND, [2.2, 10.5], [3.2, 5], [7, 0.5], [12.5, -2.5], [19, -3.5], [24.5, -2], [27.5, 1.5], CHIP], STEPS),
  downRight: smoothRoute([CHIP, [32.5, 4.5], [36.5, 7.5], [38.6, 11.5], RIGHT_HAND], STEPS),
} as const;

export { FLINT_LINK_ROUTE };
