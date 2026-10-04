/* @layer renderer-components @kind logic */
import { restPose } from './rest-pose';
import { sampleTrack } from './sample-track';
import type { ClipPose, CompiledClip, PartPose, SampleFill } from './sample.type';

/** A part's resting opacity while this clip plays: 0 for an effect the clip does not list as still, else 1. */
type RestOf = (part: string, clip: CompiledClip) => number;

/** Two tracks on one part add up, as composite add does; exact while at most one of them moves the part. */
const stack = (a: PartPose, b: PartPose, rest: number): PartPose => ({
  x: a.x + b.x,
  y: a.y + b.y,
  rotate: a.rotate + b.rotate,
  scaleX: a.scaleX * b.scaleX,
  scaleY: a.scaleY * b.scaleY,
  opacity: a.opacity + b.opacity - rest,
});

/** Samples every track of a clip at elapsed milliseconds, exactly as the browser's keyframe timing would. */
const sampleClip = (clip: CompiledClip, elapsed: number, fill: SampleFill, restOf: RestOf, loop = clip.loop): ClipPose => {
  const pose: ClipPose = new Map();
  for (const part of clip.still) pose.set(part, restPose(1));
  const timing = { duration: clip.duration, loop, fill };
  const sampled = new Set<string>();
  for (const track of clip.tracks) {
    const rest = restOf(track.part, clip);
    const next = sampleTrack(track, elapsed, timing, rest);
    if (!next) continue;
    const before = sampled.has(track.part) ? pose.get(track.part) : undefined;
    pose.set(track.part, before ? stack(before, next, rest) : next);
    sampled.add(track.part);
  }
  return pose;
};

export { sampleClip };
