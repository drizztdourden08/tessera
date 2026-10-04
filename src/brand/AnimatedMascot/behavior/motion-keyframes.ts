/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../../brand.type';
import { EASE } from '../../motion/motion.constants';
import type { MotionFrame } from '../../motion/motion.type';
import { PRECISION } from '../../scene/scene.constants';

const num = (n: number): number => Number(n.toFixed(PRECISION));

const frameTransform = (frame: MotionFrame, [px, py]: ScenePoint): string => {
  const { x = 0, y = 0, rotate = 0, scale = 1 } = frame;
  const sx = frame.scaleX ?? scale;
  const sy = frame.scaleY ?? scale;
  return `translate(${num(px + x)}px, ${num(py + y)}px) rotate(${rotate}deg) scale(${sx}, ${sy}) translate(${-px}px, ${-py}px)`;
};

const motionKeyframes = (frames: readonly MotionFrame[], pivot: ScenePoint, rest = 1): Keyframe[] => {
  const fades = rest !== 1 || frames.some((f) => f.opacity !== undefined);
  return frames.map((f) => ({
    offset: f.at,
    easing: f.ease ?? EASE.inOut,
    transform: frameTransform(f, pivot),
    ...(fades ? { opacity: (f.opacity ?? rest) - rest } : {}),
  }));
};

export { motionKeyframes };
