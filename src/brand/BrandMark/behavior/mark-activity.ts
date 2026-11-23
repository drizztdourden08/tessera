/* @layer renderer-components @kind logic */
import type { BrandMarkPath } from '../../brand.type';
import type { BrandMarkActivity } from '../BrandMark.type';

const markActivity = (paths: readonly BrandMarkPath[], activity: BrandMarkActivity | undefined): string =>
  activity !== undefined && paths.some((p) => p.part !== undefined) ? `brand-mark--${activity}` : '';

export { markActivity };
