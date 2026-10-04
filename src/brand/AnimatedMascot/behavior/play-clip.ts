/* @layer renderer-components @kind logic */
import { MOTION_PART_ATTR } from '../../motion/motion.constants';
import type { MascotAnimation, MascotMotion } from '../../motion/motion.type';
import { motionKeyframes } from './motion-keyframes';
import { motionPivots } from './motion-pivots';

const playClip = (svg: SVGSVGElement, motion: MascotMotion, clip: MascotAnimation, loop: boolean): Animation[] => {
  const pivots = motionPivots(motion);
  return clip.tracks.flatMap((track) => {
    const parts = [...svg.querySelectorAll(`[${MOTION_PART_ATTR}="${track.part}"]`)];
    const pivot = pivots.get(track.part);
    if (!pivot) return [];
    const keyframes = motionKeyframes(track.frames, pivot);
    const timing: KeyframeAnimationOptions = { duration: clip.duration, delay: track.lag ?? 0, iterations: loop ? Infinity : 1, composite: 'add' };
    return parts.map((part) => part.animate(keyframes, timing));
  });
};

export { playClip };
