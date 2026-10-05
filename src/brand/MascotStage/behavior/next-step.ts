/* @layer renderer-components @kind logic */
import type { ActorCore } from './actor.type';
import { settleRest } from './settle-rest';
import { startStep } from './start-step';

const nextStep = (actor: ActorCore, now: number): void => {
  const queued = actor.queue.shift();
  if (queued) {
    startStep(actor, queued, now);
    return;
  }
  settleRest(actor, now);
  actor.emit({ type: 'idle', x: actor.x });
};

export { nextStep };
