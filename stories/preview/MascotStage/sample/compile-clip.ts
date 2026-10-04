/* @layer stories @kind logic */
import type { ScenePoint } from '../../../../src/brand/brand.type';
import { PRECISION } from '../../../../src/brand/scene/scene.constants';
import { EASE } from '../../../../src/brand/motion/motion.constants';
import type { MascotAnimation, MotionFrame, MotionTrack } from '../../../../src/brand/motion/motion.type';
import { easeCurve } from './ease-curve';
import type { CompiledClip, CompiledFrame, CompiledTrack } from './sample.type';

const num = (n: number): number => Number(n.toFixed(PRECISION));

const compileFrame = (frame: MotionFrame, [px, py]: ScenePoint): CompiledFrame => {
  const { x = 0, y = 0, rotate = 0, scale = 1 } = frame;
  return {
    at: frame.at,
    x: num(px + x) - px,
    y: num(py + y) - py,
    rotate,
    scaleX: frame.scaleX ?? scale,
    scaleY: frame.scaleY ?? scale,
    opacity: frame.opacity,
    ease: easeCurve(frame.ease ?? EASE.inOut),
  };
};

const neutral = (at: number): MotionFrame => ({ at, ease: EASE.linear });

const compileTrack = (track: MotionTrack, pivot: ScenePoint): CompiledTrack => {
  const frames = [...track.frames];
  if ((frames[0]?.at ?? 0) > 0) frames.unshift(neutral(0));
  if ((frames[frames.length - 1]?.at ?? 1) < 1) frames.push(neutral(1));
  return { part: track.part, lag: track.lag ?? 0, frames: frames.map((f) => compileFrame(f, pivot)) };
};

const compileClip = (clip: MascotAnimation, pivots: ReadonlyMap<string, ScenePoint>): CompiledClip => {
  const tracks = clip.tracks.flatMap((track) => {
    const pivot = pivots.get(track.part);
    return pivot ? [compileTrack(track, pivot)] : [];
  });
  const span = clip.duration + Math.max(0, ...tracks.map((t) => t.lag));
  return { source: clip, duration: clip.duration, loop: clip.loop, span, tracks, still: new Set(clip.still ?? []), pivots };
};

export { compileClip };
