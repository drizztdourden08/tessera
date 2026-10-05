/* @layer renderer-components @kind logic */
import { poseTransform } from './pose-transform';
import type { ClipPose } from './sample.type';
import type { ActorRig } from './actor-rig.type';
import type { PartOutput } from './pose-writer.type';
import type { ExtraWeights } from './compose-outputs.type';
import type { SourceParts } from './source-parts.type';

const composeOutputs = (rig: ActorRig, action: ClipPose, parts: SourceParts, extras: ExtraWeights): Map<string, PartOutput> => {
  const outputs = new Map<string, PartOutput>();
  const ids = new Set([...action.keys(), ...extras.keys()]);
  for (const part of ids) {
    const pivot = rig.pivots.get(part);
    const act = action.get(part);
    const rest = rig.effects.has(part) ? 0 : 1;
    let opacity = act ? act.opacity : rest;
    const extra = extras.get(part);
    if (extra) opacity += (extra.target - opacity) * extra.weight;
    outputs.set(part, { transform: act && pivot ? poseTransform(act, pivot) : '', opacity, fades: parts.fading.has(part) || extra !== undefined });
  }
  return outputs;
};

export { composeOutputs };
