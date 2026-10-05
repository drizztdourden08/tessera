/* @layer renderer-components @kind logic */
import type { StageActor } from './create-actor.type';
import { placeActor } from './place-actor';
import type { EngineState } from './stage-engine.type';

const homeAfterResize = (actor: StageActor, index: number, sizes: { before: number; after: number; count: number }): number | undefined => {
  const { core } = actor;
  if (sizes.before === 0) return (sizes.after * (index + 1)) / (sizes.count + 1);
  return core.spread ? (core.home / sizes.before) * sizes.after : undefined;
};

const resizeStage = (state: EngineState, width: number, height: number): void => {
  const sizes = { before: state.width, after: width, count: state.actors.size };
  state.width = width;
  state.height = height;
  [...state.actors.values()].forEach((actor, index) => {
    const home = state.casts.get(actor.core.id)?.x === undefined ? homeAfterResize(actor, index, sizes) : undefined;
    if (home !== undefined) {
      actor.core.x = home;
      actor.core.home = home;
    }
    placeActor(state, actor);
  });
};

export { resizeStage };
