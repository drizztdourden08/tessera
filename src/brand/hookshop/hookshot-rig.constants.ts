/* @layer renderer-components @kind data */
import type { HookshotRig } from './hookshop.type';

const HOOKSHOT_RIG: HookshotRig = {
  handle: { grip: [2, 3], muzzle: [9, 3] },
  linkFace: { pinA: [2, 2.5], pinB: [6, 2.5] },
  linkEdge: { pinA: [1, 1.5], pinB: [5, 1.5] },
  head: { back: [0, 4.5], tip: [10, 4.5] },
};

export { HOOKSHOT_RIG };
