/* @layer renderer-components @kind data */
import type { SentriRig } from './sentri.type';

const SENTRI_RIG: SentriRig = {
  body: [0, 0],
  visor: [10, 11],
  eyes: [[13, 13], [19, 13]],
  podLeft: { at: [0, 13], pivot: [5, 2.5] },
  podRight: { at: [28, 13], pivot: [1, 2.5] },
  lookReach: [2, 1],
};

export { SENTRI_RIG };
