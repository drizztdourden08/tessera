/* @layer renderer-components @kind util */
import { REDUCED_MOTION_QUERY } from '../../../primitives/dom/reduced-motion.constants';

const initialPlaying = (autoPlay: boolean): boolean => {
  if (!autoPlay) return false;
  if (typeof globalThis.matchMedia !== 'function') return true;
  return !globalThis.matchMedia(REDUCED_MOTION_QUERY).matches;
};

export { initialPlaying };
