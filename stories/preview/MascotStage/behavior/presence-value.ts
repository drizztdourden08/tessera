/* @layer stories @kind logic */
import { PRESENCE_FADE_MS } from '../MascotStage.constants';
import type { ActorCore } from './actor.type';
import { easeWeight } from './ease-weight';

const presenceValue = (actor: ActorCore, now: number): number => {
  const { from, to, start } = actor.presence;
  return from + (to - from) * easeWeight(now - start, PRESENCE_FADE_MS);
};

export { presenceValue };
