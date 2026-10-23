/* @layer renderer-components @kind constants */
import { arc } from './arc';
import { band } from './band';
import type { SilhouetteShape } from '../ControllerSilhouette.type';

const LOBE_X = 288;
const LOBE_Y = 142;
const LOBE_R = 84;

const PAD_SHAPE: SilhouetteShape = {
  half: {
    start: [200, 74],
    curves: [
      [228, 74, 252, 58, LOBE_X, LOBE_Y - LOBE_R],
      ...arc(LOBE_X, LOBE_Y, LOBE_R, 270, 450),
      [252, 226, 228, 210, 200, 210],
    ],
  },
  parts: [
    { kind: 'shoulder', outline: band({ cx: LOBE_X, cy: LOBE_Y, outer: 95, inner: 73, from: 236, to: 318 }) },
  ],
};

export { PAD_SHAPE };
