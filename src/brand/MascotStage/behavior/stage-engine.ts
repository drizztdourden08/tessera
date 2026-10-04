/* @layer renderer-components @kind logic */
import { MAX_STEP_S } from '../MascotStage.constants';
import type { MascotStageCast, MascotStageEvent, MascotStageHandle } from '../MascotStage.type';
import { actorRig } from './actor-rig';
import { actorScale } from './actor-scale';
import { createActor } from './create-actor';
import type { StageActor } from './create-actor';
import { createPoseWriter } from './pose-writer';
import { playAmbient, stopNative, syncNative } from './native-play';
import { renderActor } from './render-actor';
import { syncActor } from './sync-actor';
import { createStageClock } from './stage-clock';
import type { StageEngine, StageStats } from './stage-engine.type';

/** The engine behind one MascotStage: one clock and one frame loop for every mascot on it. */
const createStageEngine = (): StageEngine => {
  const clock = createStageClock();
  const actors = new Map<string, StageActor>();
  const casts = new Map<string, MascotStageCast>();
  const stats: StageStats = { frames: 0, busyMs: 0, worstMs: 0 };
  const listener: { current?: ((event: MascotStageEvent) => void) | undefined } = {};
  const emit = (event: MascotStageEvent): void => listener.current?.(event);
  let width = 0;
  let height = 0;
  let frame = 0;
  let last = clock.now();

  const place = (actor: StageActor): void => {
    const { core } = actor;
    const cast = casts.get(core.id);
    core.scale = actorScale(core.rig, height, cast?.size);
    const left = core.rig.anchor * core.scale;
    const right = (core.rig.scene.width - core.rig.anchor) * core.scale;
    const middle = width / 2;
    core.bounds = width > left + right ? { min: left, max: width - right } : { min: middle, max: middle };
  };
  const loop = (): void => {
    const started = performance.now();
    const now = clock.now();
    const dt = Math.min(MAX_STEP_S, Math.max(0, (now - last) / 1000));
    last = now;
    for (const actor of actors.values()) {
      actor.director?.tick(now);
      actor.runner.tick(now, dt);
      renderActor(actor.core, now, clock.state());
    }
    const spent = performance.now() - started;
    stats.frames += 1;
    stats.busyMs += spent;
    stats.worstMs = Math.max(stats.worstMs, spent);
    frame = requestAnimationFrame(loop);
  };
  const resync = (): void => {
    const now = clock.now();
    for (const actor of actors.values()) syncNative(actor.core, now, clock.state());
  };
  const release = (actor: StageActor): void => {
    stopNative(actor.core);
    for (const animation of actor.core.native.ambient) animation.cancel();
    actor.core.native = { source: undefined, clip: [], ambient: [] };
    actor.core.dom?.writer.dispose();
    actor.core.dom = undefined;
  };
  const handle: MascotStageHandle = {
    actor: (id) => actors.get(id)?.handle,
    width: () => width,
    stats: () => ({ ...stats }),
  };
  return {
    handle,
    listener,
    stats,
    sync: (cast) => {
      const ids = new Set(cast.map((c) => c.id));
      for (const [id, actor] of actors) {
        if (!ids.has(id)) {
          release(actor);
          actors.delete(id);
        }
      }
      cast.forEach((entry, index) => {
        const before = casts.get(entry.id);
        casts.set(entry.id, entry);
        const known = actors.get(entry.id);
        const rig = actorRig(entry.brand);
        if (known && before?.brand === entry.brand) syncActor(known, before, entry, clock.now());
        else if (rig) {
          const spread = width > 0 ? (width * (index + 1)) / (cast.length + 1) : 0;
          const actor = createActor({ cast: entry, rig, x: entry.x ?? spread, now: clock.now, emit });
          actors.set(entry.id, actor);
          place(actor);
          if (entry.clip) void actor.runner.command({ play: entry.clip, blend: 0 }, 1, false, clock.now());
        }
      });
    },
    attach: (id, wrap, svg, reduced) => {
      const actor = actors.get(id);
      if (!actor) return () => undefined;
      const { core } = actor;
      core.reduced = reduced;
      core.dom = { wrap, svg, writer: createPoseWriter(svg, core.rig.effects, core.rig.upright) };
      playAmbient(core, svg, clock.now(), clock.state());
      renderActor(core, clock.now(), clock.state());
      return () => release(actor);
    },
    resize: (nextWidth, nextHeight) => {
      const spreadBefore = width === 0;
      width = nextWidth;
      height = nextHeight;
      [...actors.values()].forEach((actor, index) => {
        place(actor);
        if (spreadBefore && casts.get(actor.core.id)?.x === undefined) {
          actor.core.x = (width * (index + 1)) / (actors.size + 1);
          actor.core.home = actor.core.x;
        }
      });
    },
    setReduced: (reduced) => {
      for (const actor of actors.values()) {
        if (actor.core.reduced === reduced) continue;
        actor.core.reduced = reduced;
        stopNative(actor.core);
        if (actor.core.dom) playAmbient(actor.core, actor.core.dom.svg, clock.now(), clock.state());
      }
    },
    setPlaying: (playing) => {
      clock.setPlaying(playing);
      resync();
    },
    setSpeed: (speed) => {
      clock.setSpeed(speed);
      resync();
    },
    start: () => {
      last = clock.now();
      frame = requestAnimationFrame(loop);
    },
    stop: () => cancelAnimationFrame(frame),
  };
};

export { createStageEngine };
