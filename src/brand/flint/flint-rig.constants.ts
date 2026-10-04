/* @layer renderer-components @kind data */
import type { FlintRig } from './flint.type';

const FLINT_RIG: FlintRig = {
  size: [40.5, 28.5],
  body: [4.5, 0],
  eyes: [[15.35, 10.15], [22.55, 10.15]],
  mouth: [18.05, 16.75],
  handLeft: { at: [0, 17.7], shoulder: [13, 4.05] },
  handRight: { at: [32.2, 17.7], shoulder: [-4.7, 4.05] },
  lookReach: [2, 1],
};

export { FLINT_RIG };
