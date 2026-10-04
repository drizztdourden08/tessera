/* @layer stories @kind logic */
import { MAX_STEP_S } from '../MascotStage.constants';
import type { MascotStageCast } from '../MascotStage.type';
import { actorRig } from './actor-rig';
import { actorScale } from './actor-scale';
import { createActor } from './create-actor';
import type { StageActor } from './create-actor';
import { stopNative } from './native-play';
import { renderActor } from './render-actor';
import type { EngineState } from './stage-engine.type';
import { syncActor } from './sync-actor';

const placeActor = (state: EngineState, actor: StageActor): void => {
  const { core } = actor;
  const { width, height } = state;
  core.scale = actorScale(core.rig, height, state.casts.get(core.id)?.size);
  const left = core.rig.anchor * core.scale;
  const right = (core.rig.scene.width - core.rig.anchor) * core.scale;
  const middle = width / 2;
  core.bounds = width > left + right ? { min: left, max: width - right } : { min: middle, max: middle };
};

const releaseActor = (actor: StageActor): void => {
  stopNative(actor.core);
  for (const animation of actor.core.native.ambient) animation.cancel();
  actor.core.native = { source: undefined, clip: [], ambient: [] };
  actor.core.dom?.writer.dispose();
  actor.core.dom = undefined;
};

const addActor = (state: EngineState, entry: MascotStageCast, spread: number): void => {
  const rig = actorRig(entry.brand);
  if (!rig) return;
  const actor = createActor({ cast: entry, rig, x: entry.x ?? spread, now: state.clock.now, emit: state.emit });
  state.actors.set(entry.id, actor);
  placeActor(state, actor);
  if (entry.clip) void actor.runner.command({ play: entry.clip, blend: 0 }, 1, false, state.clock.now());
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

const tickStage = (state: EngineState): void => {
  const started = performance.now();
  const now = state.clock.now();
  const dt = Math.min(MAX_STEP_S, Math.max(0, (now - state.last) / 1000));
  state.last = now;
  for (const actor of state.actors.values()) {
    if (actor.core.presence.to > 0) actor.director?.tick(now);
    actor.runner.tick(now, dt);
    renderActor(actor.core, now, state.clock.state());
  }
  const spent = performance.now() - started;
  state.stats.frames += 1;
  state.stats.busyMs += spent;
  state.stats.worstMs = Math.max(state.stats.worstMs, spent);
};

export { releaseActor, resizeStage, syncCast, tickStage };
