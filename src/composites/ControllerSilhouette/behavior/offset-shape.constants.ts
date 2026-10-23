/* @layer renderer-components @kind constants */
import type { SilhouetteShape } from '../ControllerSilhouette.type';

const OFFSET_SHAPE: SilhouetteShape = {
  half: {
    start: [200, 60],
    curves: [
      [226, 60, 248, 48, 286, 44],
      [326, 40, 352, 50, 366, 72],
      [382, 98, 392, 146, 395, 186],
      [398, 226, 386, 252, 358, 254],
      [334, 256, 318, 240, 302, 222],
      [288, 208, 272, 212, 240, 212],
      [222, 212, 210, 212, 200, 212],
    ],
  },
  parts: [
    {
      kind: 'trigger',
      outline: {
        start: [262, 46],
        curves: [[264, 26, 276, 14, 300, 13], [322, 12, 340, 20, 348, 34], [354, 44, 350, 52, 340, 54], [310, 56, 280, 56, 262, 46]],
      },
    },
    {
      kind: 'shoulder',
      outline: {
        start: [240, 62],
        curves: [[246, 44, 264, 34, 294, 32], [324, 30, 350, 40, 362, 58], [366, 66, 362, 74, 354, 74], [320, 72, 268, 68, 240, 62]],
      },
    },
  ],
};

export { OFFSET_SHAPE };
