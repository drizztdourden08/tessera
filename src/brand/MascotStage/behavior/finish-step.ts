/* @layer renderer-components @kind logic */
import type { MascotStepResult } from '../MascotStage.type';
import type { ActorCore } from './actor.type';

const finishStep = (actor: ActorCore, result: MascotStepResult): void => {
  const step = actor.step;
  if (!step) return;
  actor.step = undefined;
  step.resolve(result);
  actor.emit({ type: 'step-end', result, ...(step.clip ? { clip: step.clip } : {}), x: actor.x });
};

export { finishStep };
