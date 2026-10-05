/* @layer renderer-components @kind logic */
import { actorScale } from './actor-scale';
import type { StageActor } from './create-actor.type';
import type { EngineState } from './stage-engine.type';

const placeActor = (state: EngineState, actor: StageActor): void => {
  const { core } = actor;
  const { width, height } = state;
  core.scale = actorScale(core.rig, height, state.casts.get(core.id)?.size);
  const left = core.rig.anchor * core.scale;
  const right = (core.rig.scene.width - core.rig.anchor) * core.scale;
  const middle = width / 2;
  core.bounds = width > left + right ? { min: left, max: width - right } : { min: middle, max: middle };
};

export { placeActor };
