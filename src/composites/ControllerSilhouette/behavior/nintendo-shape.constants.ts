/* @layer renderer-components @kind constants */
import type { Outline } from '../ControllerSilhouette.type';

const NINTENDO_SHAPE: Outline = {
  start: [200, 30],
  curves: [
    [235, 30, 268, 30, 290, 33],
    [312, 36, 328, 46, 338, 62],
    [345, 73.2, 358, 130, 358, 178],
    [358, 220, 350, 250, 330, 250],
    [312, 250, 302, 226, 290, 205],
    [282.8, 192.4, 274, 190, 262, 190],
    [240, 190, 220, 190, 200, 190],
  ],
};

export { NINTENDO_SHAPE };
