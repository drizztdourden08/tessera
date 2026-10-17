/* @layer renderer-components @kind util */
import { ownerWindowOf } from './owner-window';
import { REDUCED_MOTION_QUERY } from './reduced-motion.constants';

const reducedNow = (node: Element): boolean => ownerWindowOf(node).matchMedia(REDUCED_MOTION_QUERY).matches;

export { reducedNow };
