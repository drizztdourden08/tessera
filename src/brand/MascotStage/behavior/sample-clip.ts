/* @layer renderer-components @kind logic */
import { restPose } from './rest-pose';
import { sampleTrack } from './sample-track';
import type { ClipPose, CompiledClip, PartPose, RestOf, SampleFill } from './sample.type';

const stack = (a: PartPose, b: PartPose, rest: number): PartPose => ({
  x: a.x + b.x,
  y: a.y + b.y,
  rotate: a.rotate + b.rotate,
  scaleX: a.scaleX * b.scaleX,
  scaleY: a.scaleY * b.scaleY,
  opacity: a.opacity + b.opacity - rest,
});

const sampleClip = (clip: CompiledClip, elapsed: number, how: { fill: SampleFill; restOf: RestOf; loop?: boolean }): ClipPose => {
  const { fill, restOf, loop = clip.loop } = how;
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
