/* @layer renderer-components @kind logic */
import { OVERFLOW_TOLERANCE } from './overflow-probe.constants';
import type { OverflowProbe } from './overflow-probe.type';

const naturalWidth = (probe: OverflowProbe): number =>
  probe.scrollWidth - probe.flexibleRendered + probe.flexibleFitted;

const isOverflowing = (probe: OverflowProbe): boolean =>
  naturalWidth(probe) > probe.clientWidth + OVERFLOW_TOLERANCE;

export { isOverflowing };
