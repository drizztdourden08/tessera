/* @layer renderer-components @kind logic */
import { actorHandle } from './actor-handle';
import { createActorCore } from './actor-core';
import type { ActorSetup, StageActor } from './create-actor.type';
import { createDirector } from './create-director';
import { createStepRunner } from './step-runner';

const createActor = (setup: ActorSetup): StageActor => {
  const core = createActorCore(setup);
  const runner = createStepRunner(core);
  const setAutonomy: StageActor['setAutonomy'] = (config) => {
    actor.director = config ? createDirector(core, runner, config === true ? {} : config) : undefined;
  };
  const actor: StageActor = { core, runner, director: undefined, setAutonomy, handle: actorHandle({ core, runner, now: setup.now, autonomy: setAutonomy }) };
  setAutonomy(setup.cast.autonomy);
  return actor;
};

export { createActor };
