/* @layer renderer-components @kind logic */
import { PAGE_FRACTION } from './scroll-strip.constants';

const pageDeltaFor = (clientWidth: number, direction: -1 | 1): number =>
  direction * clientWidth * PAGE_FRACTION;

export { pageDeltaFor };
