/* @layer renderer-components @kind logic */
import { TRAVEL_SLICE_S } from '../MascotStage.constants';
import type { ActorCore } from './actor.type';
import { travelActor } from './travel-actor';

const travelFor = (actor: ActorCore, dt: number): boolean => {
  let left = dt;
  do {
    const slice = Math.min(TRAVEL_SLICE_S, left);
    left -= slice;
    if (travelActor(actor, slice)) return true;
  } while (left > 0);
  return false;
};

export { travelFor };
