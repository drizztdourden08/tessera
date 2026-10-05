/* @layer renderer-components @kind logic */
import type { MascotStageHandle } from '../MascotStage.type';
import { joinFrameLoop } from './frame-loop';
import { playAmbient } from './play-ambient';
import { createPoseWriter } from './pose-writer';
import { releaseActor } from './release-actor';
import { renderActor } from './render-actor';
import { resizeStage } from './resize-stage';
import { createStageClock } from './stage-clock';
import type { EngineState, StageEngine } from './stage-engine.type';
import { stopNative } from './stop-native';
import { syncCast } from './sync-cast';
import { syncNative } from './sync-native';
import { tickStage } from './tick-stage';

const engineState = (): EngineState => {
  const clock = createStageClock();
  const listener: EngineState['listener'] = {};
  return {
    clock, actors: new Map(), casts: new Map(), stats: { frames: 0, busyMs: 0, worstMs: 0 }, listener,
    emit: (event) => listener.current?.(event), width: 0, height: 0, element: null, leave: undefined, last: clock.now(),
  };
};

const handleOf = (state: EngineState): MascotStageHandle => ({
  actor: (id) => state.actors.get(id)?.handle,
  width: () => state.width,
  stageX: (clientX) => clientX - (state.element?.getBoundingClientRect().left ?? 0),
  stats: () => ({ ...state.stats }),
});

const resync = (state: EngineState): void => {
  const now = state.clock.now();
  for (const actor of state.actors.values()) syncNative(actor.core, now, state.clock.state());
};

const setReduced = (state: EngineState, reduced: boolean): void => {
  for (const { core } of state.actors.values()) {
    if (core.reduced === reduced) continue;
    core.reduced = reduced;
    stopNative(core);
    if (core.dom) playAmbient(core, core.dom.svg, state.clock.now(), state.clock.state());
  }
};

const attach = (state: EngineState, id: string, dom: { wrap: HTMLElement | undefined; svg: SVGSVGElement; reduced: boolean }): (() => void) => {
  const actor = state.actors.get(id);
  if (!actor) return () => undefined;
  const { core } = actor;
  core.reduced = dom.reduced;
  core.dom = { wrap: dom.wrap, svg: dom.svg, writer: createPoseWriter(dom.svg, core.rig.effects, core.rig.upright) };
  playAmbient(core, dom.svg, state.clock.now(), state.clock.state());
  renderActor(core, state.clock.now(), state.clock.state());
  return () => releaseActor(actor);
};

const createStageEngine = (): StageEngine => {
  const state = engineState();
  return {
    handle: handleOf(state),
    listener: state.listener,
    stats: state.stats,
    sync: (cast) => syncCast(state, cast),
    attach: (id, wrap, svg, reduced) => attach(state, id, { wrap, svg, reduced }),
    resize: (width, height) => resizeStage(state, width, height),
    setReduced: (reduced) => setReduced(state, reduced),
    setElement: (element) => { state.element = element; },
    setPlaying: (playing) => { state.clock.setPlaying(playing); resync(state); },
    setSpeed: (speed) => { state.clock.setSpeed(speed); resync(state); },
    start: () => {
      state.leave?.();
      state.last = state.clock.now();
      state.leave = joinFrameLoop(() => tickStage(state));
    },
    stop: () => {
      state.leave?.();
      state.leave = undefined;
    },
  };
};

export { createStageEngine };
