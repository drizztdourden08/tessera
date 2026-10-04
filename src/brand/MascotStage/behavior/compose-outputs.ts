/* @layer renderer-components @kind logic */
import { poseTransform } from '../../motion/sample/pose-transform';
import type { ClipPose } from '../../motion/sample/sample.type';
import type { ActorRig } from './actor-rig.type';
import type { PartOutput } from './pose-writer.type';
import type { SourceParts } from './source-parts';

/** Weight and target of each extra the host has forced shown or hidden. */
type ExtraWeights = ReadonlyMap<string, { weight: number; target: number }>;

/**
 * Turns a sampled action pose into what each part draws. The ambient clip is not in here: it keeps
 * playing natively underneath, and the held frames add onto it, as the clips always did. Forced extras
 * then fade to their target.
 */
const composeOutputs = (rig: ActorRig, action: ClipPose, parts: SourceParts, extras: ExtraWeights): Map<string, PartOutput> => {
  const outputs = new Map<string, PartOutput>();
  const ids = new Set([...action.keys(), ...extras.keys()]);
  for (const part of ids) {
    const pivot = rig.pivots.get(part);
    const act = action.get(part);
    let opacity = act ? act.opacity : rig.effects.has(part) ? 0 : 1;
    const extra = extras.get(part);
    if (extra) opacity += (extra.target - opacity) * extra.weight;
    outputs.set(part, { transform: act && pivot ? poseTransform(act, pivot) : '', opacity, fades: parts.fading.has(part) || extra !== undefined });
  }
  return outputs;
};

export { composeOutputs };
export type { ExtraWeights };
