/* @layer stories @kind logic */
import type { MascotStep, StepResult } from '../MascotStage.type';
import type { ActorCore, QueuedStep } from './actor.type';
import { beginPlay, startStep } from './start-step';
import { dropQueue, dropWaiting, finishStep, interruptStep, isProtected, isUrgent, nextStep } from './step-flow';
import type { StepRunner } from './step-runner.type';
import { travelActor } from './travel-actor';

const arrive = (actor: ActorCore, now: number): void => {
  const walking = actor.travel?.walking === true;
  actor.travel = undefined;
  const step = actor.step;
  if (!walking || step?.phase !== 'move') return;
  actor.emit({ type: 'arrive', x: actor.x });
  if ('play' in step.step) beginPlay(actor, step, step.step, now);
  else {
    finishStep(actor, 'done');
    nextStep(actor, now);
  }
};

const tickSteps = (actor: ActorCore, now: number, dt: number): void => {
  if (travelActor(actor, dt)) arrive(actor, now);
  if (actor.waiting && !isProtected(actor, now)) {
    const waiting = actor.waiting;
    actor.waiting = undefined;
    interruptStep(actor);
    startStep(actor, waiting, now);
  }
  if (actor.step && actor.step.phase !== 'move' && now >= actor.step.endsAt) {
    finishStep(actor, 'done');
    nextStep(actor, now);
  }
};

const createStepRunner = (actor: ActorCore): StepRunner => ({
  command: (step: MascotStep, priority: number, host: boolean, now: number): Promise<StepResult> => new Promise((resolve) => {
    const queued: QueuedStep = { step, priority, host, resolve };
    if (host) actor.lastHost = now;
    dropWaiting(actor);
    if (!isUrgent(step, priority) && isProtected(actor, now)) {
      dropQueue(actor);
      actor.waiting = queued;
      return;
    }
    interruptStep(actor);
    startStep(actor, queued, now);
  }),
  enqueue: (steps, priority, host, now) => {
    if (host) actor.lastHost = now;
    const promises = steps.map((step) => new Promise<StepResult>((resolve) => actor.queue.push({ step, priority, host, resolve })));
    if (!actor.step && !actor.waiting) nextStep(actor, now);
    return promises[promises.length - 1] ?? Promise.resolve('done');
  },
  tick: (now, dt) => tickSteps(actor, now, dt),
  stop: (now) => {
    dropWaiting(actor);
    interruptStep(actor);
    nextStep(actor, now);
  },
  idle: () => !actor.step && !actor.waiting && actor.queue.length === 0,
});

export { createStepRunner };
