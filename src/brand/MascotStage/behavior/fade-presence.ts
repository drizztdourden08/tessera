/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import { presenceValue } from './presence-value';

/** Starts fading a mascot out or in from wherever its current fade is. */
const fadePresence = (actor: ActorCore, visible: boolean, now: number): void => {
  const to = visible ? 1 : 0;
  if (actor.presence.to === to) return;
  actor.presence = { from: presenceValue(actor, now), to, start: now };
};

export { fadePresence };
