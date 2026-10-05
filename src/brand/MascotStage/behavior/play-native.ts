/* @layer renderer-components @kind logic */
import { playClip } from './play-clip';
import type { ActorCore } from './actor.type';
import type { ClockState } from './clock-state.type';
import type { ClipSource } from './pose-source.type';
import { syncAnimations } from './sync-animations';

const playNative = (actor: ActorCore, source: ClipSource, now: number, clock: ClockState): void => {
  const svg = actor.dom?.svg;
  if (!svg) return;
  const counted = Number.isFinite(source.until) ? Math.round(source.until / source.clip.duration) : undefined;
  const animations = playClip(svg, actor.rig.motion, source.clip.source, source.loop);
  if (counted) for (const animation of animations) animation.effect?.updateTiming({ iterations: counted });
  syncAnimations(animations, (now - source.start) * source.rate, source.rate, clock);
  actor.native = { ...actor.native, source, clip: animations };
};

export { playNative };
