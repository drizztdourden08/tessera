/* @layer stories @kind constants */
import type { BrandRim } from '../../../src/brand';
import type { RimColumn, RimGround } from './RimGrid.type';

const RIMS: readonly BrandRim[] = ['none', 'light', 'dark'];

const GROUNDS: readonly RimGround[] = ['dark', 'light'];

const RIM_COLUMNS: readonly RimColumn[] = GROUNDS.flatMap((ground) => RIMS.map((rim) => ({
  key: `${ground}-${rim}`,
  label: `${ground} ground, ${rim === 'none' ? 'no rim' : `${rim} rim`}`,
  ground,
  rim,
})));

export { RIM_COLUMNS, RIMS };
