/* @layer renderer-components @kind logic */
import type { MascotActorHandle, MascotStageCast, MascotStageEvent } from '../MascotStage.type';
import type { ActorCore } from './actor.type';
import { finalClip } from './actor-moves';
import { fadePresence } from './fade-presence';
import type { ActorRig } from './actor-rig.type';
import type { AutonomyConfig } from './autonomy.type';
import { createDirector } from './create-director';
import type { Director } from './create-director';
import { createStepRunner } from './step-runner';
import type { StepRunner } from './step-runner.type';

const HOST = 1;

interface StageActor {
  core: ActorCore;
  runner: StepRunner;
  handle: MascotActorHandle;
  director: Director | undefined;
  setAutonomy: (config: boolean | AutonomyConfig | undefined) => void;
}

interface ActorSetup {
  cast: MascotStageCast;
  rig: ActorRig;
  x: number;
  now: () => number;
  emit: (event: MascotStageEvent) => void;
}

const fadeExtra = (core: ActorCore, id: string, mode: 'auto' | 'show' | 'hide', now: number): void => {
  const before = core.overrides.get(id);
  const weight = before ? before.to : 0;
  if (mode === 'auto') {
    if (before) core.overrides.set(id, { ...before, from: weight, to: 0, start: now });
    return;
  }
  core.overrides.set(id, { target: mode === 'show' ? 1 : 0, start: now, from: before && before.target === (mode === 'show' ? 1 : 0) ? weight : 0, to: 1 });
};

/** One mascot on a stage: its state, its step runner, its optional director, and the handle the host gets. */
const createActor = (setup: ActorSetup): StageActor => {
  const { cast, rig, x, now, emit } = setup;
  const rest = cast.rest ?? rig.motion.rest as ActorCore['rest'];
  const start = now();
  const core: ActorCore = {
    id: cast.id, rig, rest, x, home: x, velocity: 0, facing: cast.face ?? 'right', ambientStart: start,
    source: { kind: 'clip', id: rest, clip: rig.clips.get(rest)!, start, loop: true, until: Infinity, rate: 1 },
    turn: { from: cast.face === 'left' ? -1 : 1, to: cast.face === 'left' ? -1 : 1, start },
    travel: undefined, step: undefined, queue: [], waiting: undefined, overrides: new Map(),
    bounds: { min: x, max: x }, lastHost: start, reduced: false, scale: 1, dom: undefined, native: { source: undefined, clip: [], ambient: [] },
    presence: { from: cast.hidden ? 0 : 1, to: cast.hidden ? 0 : 1, start }, away: false,
    emit: (event) => emit({ ...event, actor: cast.id }),
  };
  const runner = createStepRunner(core);
  const actor: StageActor = {
    core, runner, director: undefined,
    setAutonomy: (config) => {
      actor.director = config ? createDirector(core, runner, config === true ? {} : config) : undefined;
    },
    handle: {
      id: cast.id,
      play: (clip, options = {}) => runner.command({ play: clip, ...options }, options.priority ?? HOST, true, now()),
      moveTo: (to, options = {}) => runner.command({ moveTo: to, ...options }, options.priority ?? HOST, true, now()),
      face: (facing) => runner.command({ face: facing }, HOST, true, now()),
      queue: (steps) => runner.enqueue(steps, HOST, true, now()),
      stop: () => runner.stop(now()),
      effect: (id, mode) => fadeExtra(core, id, mode, now()),
      effects: (mode) => {
        for (const id of rig.effects) fadeExtra(core, id, mode, now());
      },
      autonomy: (config) => actor.setAutonomy(config),
      setVisible: (visible) => fadePresence(core, visible, now()),
      state: () => ({
        x: core.x, facing: core.facing, clip: finalClip(core.source).id, moving: core.travel !== undefined,
        busy: !runner.idle(), queued: core.queue.length, visible: core.presence.to > 0,
      }),
    },
  };
  actor.setAutonomy(cast.autonomy);
  return actor;
};

export { createActor };
export type { StageActor };
