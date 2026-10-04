/* @layer renderer-components @kind logic */
import { ACCEL_PER_SPEED } from '../MascotStage.constants';
import type { MascotStep, StepResult } from '../MascotStage.type';
import type { ActorCore, QueuedStep } from './actor.type';
import { finalClip, settleRest } from './actor-moves';
import { beginPlay, startStep } from './start-step';
import type { StepRunner } from './step-runner.type';
import { CLIP_RULES, URGENT } from './transition-rules.constants';
import { travelActor } from './travel-actor';

const isUrgent = (step: MascotStep, priority: number): boolean => priority >= URGENT || ('play' in step && CLIP_RULES[step.play]?.urgent === true);

/** True while the playing clip is in the stretch its rules protect (a jump in the air). */
const isProtected = (actor: ActorCore, now: number): boolean => {
  const step = actor.step;
  const window = step?.phase === 'play' && step.clip ? CLIP_RULES[step.clip]?.protect : undefined;
  const source = finalClip(actor.source);
  if (!window || source.id !== step?.clip) return false;
  const progress = ((now - source.start) * source.rate) / source.clip.duration;
  return progress >= window[0] && progress <= window[1];
};

/** Stops walking without a jump: brakes from the current speed to a stop just ahead. */
const glide = (actor: ActorCore): void => {
  const { travel, velocity } = actor;
  if (!travel) return;
  const ahead = (velocity * Math.abs(velocity)) / (2 * travel.speed * ACCEL_PER_SPEED);
  actor.travel = Math.abs(velocity) > 1 ? { target: actor.x + ahead, speed: travel.speed, walking: false } : undefined;
};

/** Runs one mascot's steps: commands interrupt, queued steps wait their turn, and it rests when done. */
const createStepRunner = (actor: ActorCore): StepRunner => {
  const finish = (result: StepResult): void => {
    const step = actor.step;
    if (!step) return;
    actor.step = undefined;
    step.resolve(result);
    actor.emit({ type: 'step-end', result, ...(step.clip ? { clip: step.clip } : {}), x: actor.x });
  };
  const next = (now: number): void => {
    const queued = actor.queue.shift();
    if (queued) {
      startStep(actor, queued, now);
      return;
    }
    settleRest(actor, now);
    actor.emit({ type: 'idle', x: actor.x });
  };
  const dropQueue = (): void => {
    for (const queued of actor.queue.splice(0)) queued.resolve('interrupted');
  };
  const interrupt = (): void => {
    glide(actor);
    finish('interrupted');
    dropQueue();
  };
  const command = (step: MascotStep, priority: number, host: boolean, now: number): Promise<StepResult> => new Promise((resolve) => {
    const queued: QueuedStep = { step, priority, host, resolve };
    if (host) actor.lastHost = now;
    actor.waiting?.resolve('interrupted');
    actor.waiting = undefined;
    if (!isUrgent(step, priority) && isProtected(actor, now)) {
      dropQueue();
      actor.waiting = queued;
      return;
    }
    interrupt();
    startStep(actor, queued, now);
  });
  const enqueue = (steps: readonly MascotStep[], priority: number, host: boolean, now: number): Promise<StepResult> => {
    if (host) actor.lastHost = now;
    const promises = steps.map((step) => new Promise<StepResult>((resolve) => actor.queue.push({ step, priority, host, resolve })));
    if (!actor.step && !actor.waiting) next(now);
    return promises[promises.length - 1] ?? Promise.resolve('done');
  };
  const arrive = (now: number): void => {
    const walking = actor.travel?.walking === true;
    actor.travel = undefined;
    const step = actor.step;
    if (!walking || step?.phase !== 'move') return;
    actor.emit({ type: 'arrive', x: actor.x });
    if ('play' in step.step) beginPlay(actor, step, step.step, now);
    else {
      finish('done');
      next(now);
    }
  };
  const tick = (now: number, dt: number): void => {
    if (travelActor(actor, dt)) arrive(now);
    if (actor.waiting && !isProtected(actor, now)) {
      const waiting = actor.waiting;
      actor.waiting = undefined;
      interrupt();
      startStep(actor, waiting, now);
    }
    if (actor.step && actor.step.phase !== 'move' && now >= actor.step.endsAt) {
      finish('done');
      next(now);
    }
  };
  const stop = (now: number): void => {
    actor.waiting?.resolve('interrupted');
    actor.waiting = undefined;
    interrupt();
    next(now);
  };
  const idle = (): boolean => !actor.step && !actor.waiting && actor.queue.length === 0;
  return { command, enqueue, tick, stop, idle };
};

export { createStepRunner };
