/* @layer stories @kind logic */
import type { CompiledClip } from '../sample/sample.type';
import type { ActorRig } from './actor-rig.type';
import type { PoseSource } from './pose-source.type';
import { sourceClips } from './source-clips';

interface SourceParts {
  tracked: ReadonlySet<string>;
  fading: ReadonlySet<string>;
  inUse: ReadonlySet<string>;
}

const cache = new WeakMap<PoseSource, SourceParts>();

const partsOf = (clips: readonly CompiledClip[], rig: ActorRig): SourceParts => {
  const tracked = new Set<string>();
  const fading = new Set<string>(rig.effects);
  const inUse = new Set<string>();
  for (const clip of clips) {
    for (const track of clip.source.tracks) {
      tracked.add(track.part);
      if (track.frames.some((f) => f.opacity !== undefined)) fading.add(track.part);
      if (rig.effects.has(track.part)) inUse.add(track.part);
    }
    for (const part of clip.still) inUse.add(part);
  }
  return { tracked, fading, inUse };
};

const sourceParts = (source: PoseSource, rig: ActorRig): SourceParts => {
  const known = cache.get(source);
  if (known) return known;
  const clips = [...sourceClips(source), ...(rig.ambient ? [rig.ambient] : [])];
  const parts = partsOf(clips, rig);
  cache.set(source, parts);
  return parts;
};

export { sourceParts };
export type { SourceParts };
