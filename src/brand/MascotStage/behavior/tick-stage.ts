/* @layer renderer-components @kind logic */
import { MAX_STEP_S } from '../MascotStage.constants';
import { renderActor } from './render-actor';
import type { EngineState } from './stage-engine.type';

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

export { tickStage };
