/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import type { ClockState } from './clock-state.type';
import { syncAnimations } from './sync-animations';

const syncNative = (actor: ActorCore, now: number, clock: ClockState): void => {
  syncAnimations(actor.native.ambient, now - actor.ambientStart, 1, clock);
  const { source } = actor.native;
  if (source) syncAnimations(actor.native.clip, (now - source.start) * source.rate, source.rate, clock);
};

export { syncNative };
