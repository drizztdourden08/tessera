/* @layer renderer-components @kind logic */
import type { MascotFacing } from '../MascotStage.type';
import type { ActorCore } from './actor.type';
import { facingValue } from './facing-value';

const turnTo = (actor: ActorCore, facing: MascotFacing, now: number): boolean => {
  if (actor.facing === facing) return false;
  actor.turn = { from: facingValue(actor, now), to: facing === 'left' ? -1 : 1, start: now };
  actor.facing = facing;
  return true;
};

export { turnTo };
