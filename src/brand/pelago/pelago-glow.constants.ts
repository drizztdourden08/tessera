/* @layer renderer-components @kind data */
import type { FacetLayer } from './pelago.type';
import { PELAGO_TONES as T } from './pelago-tones.constants';

const PELAGO_HALO: readonly FacetLayer[] = [
  { ink: T.violet, opacity: 0.16, ovals: [[29, 26.2, 9.8, 11.4]] },
  { ink: T.violetMid, opacity: 0.2, ovals: [[29, 26.2, 7.9, 9.6]] },
];

const PELAGO_AURA: readonly FacetLayer[] = [
  { ink: T.violet, opacity: 0.04, ovals: [[29, 25.5, 23, 20]] },
  { ink: T.violet, opacity: 0.05, ovals: [[29, 25.5, 19, 16.5]] },
  { ink: T.violet, opacity: 0.06, ovals: [[29, 25.5, 15, 13]] },
];

const PELAGO_EYE: readonly FacetLayer[] = [
  { ink: T.pale, opacity: 0.35, ovals: [[0, 0, 1.95, 2.5]] },
  { ink: T.white, ovals: [[0, 0, 1.2, 1.75]] },
];

const PELAGO_SPARK: readonly FacetLayer[] = [
  { ink: T.lavender, opacity: 0.55, ovals: [[0, 0, 2]] },
  { ink: T.white, ovals: [[0, 0, 1]] },
];

export { PELAGO_AURA, PELAGO_EYE, PELAGO_HALO, PELAGO_SPARK };
