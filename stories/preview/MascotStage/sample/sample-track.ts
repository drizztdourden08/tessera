/* @layer stories @kind logic */
import type { CompiledFrame, CompiledTrack, PartPose, SampleTiming } from './sample.type';

const lerp = (a: number, b: number, w: number): number => a + (b - a) * w;

const frameIndex = (frames: readonly CompiledFrame[], progress: number): number => {
  let index = 0;
  for (let i = 0; i < frames.length; i += 1) if ((frames[i]?.at ?? 0) <= progress) index = i;
  return index;
};

const poseAt = (frames: readonly CompiledFrame[], progress: number, rest: number): PartPose => {
  const i = frameIndex(frames, progress);
  const from = frames[i] as CompiledFrame;
  const to = frames[i + 1];
  const span = to ? to.at - from.at : 0;
  const w = to && span > 0 ? from.ease((progress - from.at) / span) : 0;
  const end = to ?? from;
  return {
    x: lerp(from.x, end.x, w),
    y: lerp(from.y, end.y, w),
    rotate: lerp(from.rotate, end.rotate, w),
    scaleX: lerp(from.scaleX, end.scaleX, w),
    scaleY: lerp(from.scaleY, end.scaleY, w),
    opacity: lerp(from.opacity ?? rest, end.opacity ?? rest, w),
  };
};

const sampleTrack = (track: CompiledTrack, elapsed: number, timing: SampleTiming, rest: number): PartPose | undefined => {
  const local = elapsed - track.lag;
  const { duration, loop, fill } = timing;
  if (local < 0) return undefined;
  if (!loop && local >= duration) return fill === 'hold' ? poseAt(track.frames, 1, rest) : undefined;
  const progress = loop ? (local % duration) / duration : local / duration;
  return poseAt(track.frames, progress, rest);
};

export { sampleTrack };
