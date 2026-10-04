/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import { easeWeight } from './ease-weight';
import { TURN_MS } from './transition-rules.constants';

/** The horizontal scale of the mascot: 1 facing right, -1 facing left, passing through its side view on a turn. */
const facingValue = (actor: ActorCore, now: number): number => {
  const { from, to, start } = actor.turn;
  return from + (to - from) * easeWeight(now - start, actor.reduced ? 0 : TURN_MS);
};

export { facingValue };
