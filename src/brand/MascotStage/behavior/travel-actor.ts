/* @layer renderer-components @kind logic */
import { ARRIVE_PX, ACCEL_PER_SPEED } from '../MascotStage.constants';
import type { ActorCore } from './actor.type';

const clampX = (actor: ActorCore, x: number): number => Math.min(actor.bounds.max, Math.max(actor.bounds.min, x));

/**
 * Moves the mascot towards its travel target for dt seconds: it speeds up, cruises and brakes so it stops
 * on the spot, and a new target mid-way keeps the speed it has (no jump). Returns true on arrival.
 */
const travelActor = (actor: ActorCore, dt: number): boolean => {
  const { travel } = actor;
  if (!travel) {
    actor.x = clampX(actor, actor.x);
    return false;
  }
  const target = clampX(actor, travel.target);
  if (actor.reduced) {
    actor.x = target;
    actor.velocity = 0;
    return true;
  }
  const accel = travel.speed * ACCEL_PER_SPEED;
  const distance = target - actor.x;
  if (Math.abs(distance) < ARRIVE_PX && Math.abs(actor.velocity) < accel * dt * 2) {
    actor.x = target;
    actor.velocity = 0;
    return true;
  }
  const braking = Math.sqrt(2 * accel * Math.abs(distance));
  const wanted = Math.sign(distance) * Math.min(travel.speed, braking);
  const change = Math.min(accel * dt, Math.abs(wanted - actor.velocity));
  actor.velocity += Math.sign(wanted - actor.velocity) * change;
  actor.x = clampX(actor, actor.x + actor.velocity * dt);
  return false;
};

export { travelActor };
