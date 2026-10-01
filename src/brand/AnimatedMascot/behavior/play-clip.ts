/* @layer renderer-components @kind logic */
import { MOTION_PART_ATTR } from '../../motion/motion.constants';
import type { MascotAnimation, MascotMotion } from '../../motion/motion.type';
import { motionKeyframes } from './motion-keyframes';
import { motionPivots } from './motion-pivots';

const playClip = (svg: SVGSVGElement, motion: MascotMotion, clip: MascotAnimation, loop: boolean): Animation[] => {
  const pivots = motionPivots(motion);
  return clip.tracks.flatMap((track) => {
    const part = svg.querySelector(`[${MOTION_PART_ATTR}="${track.part}"]`);
    const pivot = pivots.get(track.part);
    if (!part || !pivot) return [];
    return [part.animate(motionKeyframes(track.frames, pivot), { duration: clip.duration, iterations: loop ? Infinity : 1 })];
  });
};

export { playClip };
