/* @layer renderer-components @kind logic */
import type { MascotStageCast } from '../MascotStage.type';
import { actorRig } from './actor-rig';
import { createActor } from './create-actor';
import { placeActor } from './place-actor';
import { releaseActor } from './release-actor';
import { HOST_PRIORITY } from './stage-priority.constants';
import type { EngineState } from './stage-engine.type';
import { syncActor } from './sync-actor';

const addActor = (state: EngineState, entry: MascotStageCast, spread: number): void => {
  const rig = actorRig(entry.brand);
  if (!rig) return;
  const actor = createActor({ cast: entry, rig, x: entry.x ?? spread, now: state.clock.now, emit: state.emit });
  state.actors.set(entry.id, actor);
  placeActor(state, actor);
  if (entry.clip) void actor.runner.command({ play: entry.clip, blend: 0 }, HOST_PRIORITY, false, state.clock.now());
};

const syncCast = (state: EngineState, cast: readonly MascotStageCast[]): void => {
  const ids = new Set(cast.map((c) => c.id));
  for (const [id, actor] of state.actors) {
    if (ids.has(id)) continue;
    releaseActor(actor);
    state.actors.delete(id);
  }
  cast.forEach((entry, index) => {
    const before = state.casts.get(entry.id);
    state.casts.set(entry.id, entry);
    const known = state.actors.get(entry.id);
    if (known && before?.brand === entry.brand) syncActor(known, before, entry, state.clock.now());
    else addActor(state, entry, state.width > 0 ? (state.width * (index + 1)) / (cast.length + 1) : 0);
  });
};

export { syncCast };
