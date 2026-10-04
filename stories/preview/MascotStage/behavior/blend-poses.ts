/* @layer stories @kind logic */
import { restPose } from '../sample/rest-pose';
import type { ClipPose, PartPose } from '../sample/sample.type';

const lerp = (a: number, b: number, w: number): number => a + (b - a) * w;

const nearTurn = (from: number, to: number): number => to + 360 * Math.round((from - to) / 360);

const mix = (a: PartPose, b: PartPose, w: number): PartPose => ({
  x: lerp(a.x, b.x, w),
  y: lerp(a.y, b.y, w),
  rotate: lerp(a.rotate, nearTurn(a.rotate, b.rotate), w),
  scaleX: lerp(a.scaleX, b.scaleX, w),
  scaleY: lerp(a.scaleY, b.scaleY, w),
  opacity: lerp(a.opacity, b.opacity, w),
});

interface BlendWeights {
  body: number;
  extras: number;
}

const blendPoses = (from: ClipPose, to: ClipPose, weights: BlendWeights, effects: ReadonlySet<string>): ClipPose => {
  const pose: ClipPose = new Map();
  for (const part of new Set([...from.keys(), ...to.keys()])) {
    const rest = restPose(effects.has(part) ? 0 : 1);
    const w = effects.has(part) ? weights.extras : weights.body;
    pose.set(part, mix(from.get(part) ?? rest, to.get(part) ?? rest, w));
  }
  return pose;
};

export { blendPoses };
