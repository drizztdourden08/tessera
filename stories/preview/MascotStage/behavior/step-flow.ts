/* @layer stories @kind logic */
import { ACCEL_PER_SPEED } from '../MascotStage.constants';
import type { MascotStep, StepResult } from '../MascotStage.type';
import type { ActorCore } from './actor.type';
import { finalClip, settleRest } from './actor-moves';
import { startStep } from './start-step';
import { CLIP_RULES, URGENT } from './transition-rules.constants';

const isUrgent = (step: MascotStep, priority: number): boolean => priority >= URGENT || ('play' in step && CLIP_RULES[step.play]?.urgent === true);

const isProtected = (actor: ActorCore, now: number): boolean => {
  const step = actor.step;
  const window = step?.phase === 'play' && step.clip ? CLIP_RULES[step.clip]?.protect : undefined;
  const source = finalClip(actor.source);
  if (!window || source.id !== step?.clip) return false;
  const progress = ((now - source.start) * source.rate) / source.clip.duration;
  return progress >= window[0] && progress <= window[1];
};

const glide = (actor: ActorCore): void => {
  const { travel, velocity } = actor;
  if (!travel) return;
  const ahead = (velocity * Math.abs(velocity)) / (2 * travel.speed * ACCEL_PER_SPEED);
  actor.travel = Math.abs(velocity) > 1 ? { target: actor.x + ahead, speed: travel.speed, walking: false } : undefined;
};

const finishStep = (actor: ActorCore, result: StepResult): void => {
  const step = actor.step;
  if (!step) return;
  actor.step = undefined;
  step.resolve(result);
  actor.emit({ type: 'step-end', result, ...(step.clip ? { clip: step.clip } : {}), x: actor.x });
};

const nextStep = (actor: ActorCore, now: number): void => {
  const queued = actor.queue.shift();
  if (queued) {
    startStep(actor, queued, now);
    return;
  }
  settleRest(actor, now);
  actor.emit({ type: 'idle', x: actor.x });
};

const dropQueue = (actor: ActorCore): void => {
  for (const queued of actor.queue.splice(0)) queued.resolve('interrupted');
};

const interruptStep = (actor: ActorCore): void => {
  glide(actor);
  finishStep(actor, 'interrupted');
  dropQueue(actor);
};

const dropWaiting = (actor: ActorCore): void => {
  actor.waiting?.resolve('interrupted');
  actor.waiting = undefined;
};

export { dropQueue, dropWaiting, finishStep, interruptStep, isProtected, isUrgent, nextStep };
