/* @layer renderer-components @kind logic */
import { PAGE_FRACTION } from './strip-geometry.constants';

const pageDeltaFor = (clientWidth: number, direction: -1 | 1): number =>
  direction * clientWidth * PAGE_FRACTION;

export { pageDeltaFor };
