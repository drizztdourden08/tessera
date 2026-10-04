/* @layer renderer-components @kind data */
import type { PelagoRig } from './pelago.type';

const PELAGO_RIG: PelagoRig = {
  width: 52,
  height: 42,
  goo: 1.3,
  spheres: {
    top: { at: [16.5, 10], glint: [19, 12] },
    left: { at: [7.5, 20.5], glint: [10, 22.5] },
    right: { at: [24.5, 21], glint: [28, 23.5] },
  },
  glintAngle: -25,
  eyes: [[17.5, 1.5], [26.5, 1]],
  handLeft: { at: [0, 21.5], pivot: [14, 28] },
  handRight: { at: [42.5, 20], pivot: [38, 28] },
  lookReach: [2.5, 1.5],
};

export { PELAGO_RIG };
