/* @layer renderer-components @kind constants */
import type { SilhouetteShape } from '../ControllerSilhouette.type';

const NINTENDO_SHAPE: SilhouetteShape = {
  half: {
    start: [200, 66],
    curves: [
      [232, 66, 252, 56, 284, 52],
      [322, 48, 346, 58, 358, 80],
      [372, 104, 382, 146, 382, 180],
      [382, 220, 368, 244, 342, 244],
      [318, 244, 306, 230, 294, 214],
      [284, 202, 266, 200, 244, 202],
      [226, 204, 212, 204, 200, 204],
    ],
  },
  parts: [
    {
      kind: 'trigger',
      outline: {
        start: [258, 52],
        curves: [[260, 32, 272, 22, 294, 21], [316, 20, 334, 28, 342, 42], [348, 52, 344, 58, 334, 60], [306, 62, 276, 62, 258, 52]],
      },
    },
    {
      kind: 'shoulder',
      outline: {
        start: [238, 70],
        curves: [[244, 52, 262, 44, 290, 42], [318, 40, 342, 50, 352, 66], [356, 74, 352, 82, 344, 82], [314, 80, 266, 76, 238, 70]],
      },
    },
  ],
};

export { NINTENDO_SHAPE };
