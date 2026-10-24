/* @layer renderer-components @kind constants */
import type { Outline } from '../ControllerSilhouette.type';

const NINTENDO_SHAPE: Outline = {
  start: [200, 32.5],
  curves: [
    [238.4, 32.5, 257.7, 32.2, 296, 35],
    [315, 36.4, 328.1, 48, 333, 63],
    [348.7, 110.6, 359, 155, 359, 208],
    [359, 230.8, 346.7, 250, 326.5, 250],
    [299.8, 250, 295.5, 217.6, 286, 199],
    [281.8, 190.7, 273.3, 185.5, 264, 185.5],
    [241, 185.5, 224.3, 185.5, 200, 185.5],
  ],
};

export { NINTENDO_SHAPE };
