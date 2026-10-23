/* @layer renderer-components @kind constants */
import type { SilhouetteShape } from '../ControllerSilhouette.type';

const SYMMETRIC_SHAPE: SilhouetteShape = {
  half: {
    start: [200, 64],
    curves: [
      [236, 64, 270, 58, 304, 54],
      [338, 50, 362, 60, 372, 84],
      [380, 104, 384, 136, 388, 168],
      [394, 206, 398, 236, 384, 250],
      [372, 262, 346, 258, 336, 244],
      [324, 226, 312, 206, 290, 200],
      [268, 195, 236, 202, 200, 202],
    ],
  },
  parts: [
    {
      kind: 'trigger',
      outline: {
        start: [270, 44],
        curves: [[272, 24, 286, 12, 310, 12], [332, 12, 350, 20, 356, 34], [360, 44, 356, 52, 346, 54], [316, 56, 286, 54, 270, 44]],
      },
    },
    {
      kind: 'shoulder',
      outline: {
        start: [252, 60],
        curves: [[258, 44, 278, 38, 306, 38], [334, 38, 356, 46, 366, 62], [370, 70, 366, 78, 358, 78], [326, 74, 280, 66, 252, 60]],
      },
    },
  ],
};

export { SYMMETRIC_SHAPE };
