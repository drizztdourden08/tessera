/* @layer stories @kind constants */
import type { BrandRim } from '../../../src/brand';
import type { RimColumn } from './RimGrid.type';

const RIMS: readonly BrandRim[] = ['none', 'light'];

const RIM_COLUMNS: readonly RimColumn[] = RIMS.map((rim) => ({
  key: rim,
  label: rim === 'none' ? 'no rim' : `${rim} rim`,
  rim,
}));

export { RIM_COLUMNS, RIMS };
