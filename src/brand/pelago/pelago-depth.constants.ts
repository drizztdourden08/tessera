/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';

const FAR = { left: -20, top: -20, right: 80, bottom: 80 } as const;
const MIDDLE = 25.5;
const BAND = 23.5;

const ISLAND_TOP: readonly ScenePoint[] = [
  [41.5, MIDDLE], [42, 22.8], [44.2, 19.2], [44.6, 15.3], [43.6, 12.4], [42.2, 10.7], [40.1, 11.2], [39.4, 11.8], [37.4, 12],
  [36.3, 4.6], [34.6, 1.3], [33.1, 3.8], [31.6, 11.4], [29.9, 11], [29.2, 8.2], [28, 6.3], [27, 10.9], [24.1, 10.7],
  [21.6, 9.3], [18.9, 10.5], [18, 13], [15.8, 13], [13.5, 15.3], [14.2, 19.4], [16.2, 22.5], [16.5, MIDDLE],
];

const PELAGO_FRONT_CLIP: readonly ScenePoint[] = [
  [FAR.left, FAR.top], [FAR.right, FAR.top], [FAR.right, MIDDLE], ...ISLAND_TOP, [FAR.left, MIDDLE],
  [FAR.left, BAND], [16.4, BAND], [16.5, MIDDLE], [41.5, MIDDLE], [41.9, BAND], [FAR.right, BAND], [FAR.right, FAR.bottom], [FAR.left, FAR.bottom],
];

export { PELAGO_FRONT_CLIP };
