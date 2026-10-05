/* @layer renderer-components @kind logic */
import { ACCEL_PER_SPEED } from '../MascotStage.constants';
import type { ActorCore } from './actor.type';
import { dropQueue } from './drop-queue';
import { finishStep } from './finish-step';

const glide = (actor: ActorCore): void => {
  const { travel, velocity } = actor;
  if (!travel) return;
  const ahead = (velocity * Math.abs(velocity)) / (2 * travel.speed * ACCEL_PER_SPEED);
  actor.travel = Math.abs(velocity) > 1 ? { target: actor.x + ahead, speed: travel.speed, walking: false } : undefined;
};

const interruptStep = (actor: ActorCore): void => {
  glide(actor);
  finishStep(actor, 'interrupted');
  dropQueue(actor);
};

export { interruptStep };
