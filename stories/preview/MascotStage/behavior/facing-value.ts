/* @layer stories @kind logic */
import type { ActorCore } from './actor.type';
import { easeWeight } from './ease-weight';
import { TURN_MS } from './transition-rules.constants';

const facingValue = (actor: ActorCore, now: number): number => {
  const { from, to, start } = actor.turn;
  return from + (to - from) * easeWeight(now - start, actor.reduced ? 0 : TURN_MS);
};

export { facingValue };
