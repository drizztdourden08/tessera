/* @layer renderer-components @kind logic */
import { REDUCED_MOTION_QUERY } from '../../../primitives/dom/reduced-motion.constants';

const reducedNow = (node: Element): boolean => node.ownerDocument.defaultView?.matchMedia(REDUCED_MOTION_QUERY).matches ?? false;

export { reducedNow };
