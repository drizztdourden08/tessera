/* @layer renderer-components @kind types */
import type { MascotActorHandle, MascotStageCast, MascotStageEvent } from '../MascotStage.type';
import type { ActorCore } from './actor.type';
import type { ActorRig } from './actor-rig.type';
import type { MascotAutonomyConfig } from './autonomy.type';
import type { Director } from './create-director.type';
import type { StepRunner } from './step-runner.type';

interface StageActor {
  core: ActorCore;
  runner: StepRunner;
  handle: MascotActorHandle;
  director: Director | undefined;
  setAutonomy: (config: boolean | MascotAutonomyConfig | undefined) => void;
}

interface ActorSetup {
  cast: MascotStageCast;
  rig: ActorRig;
  x: number;
  now: () => number;
  emit: (event: MascotStageEvent) => void;
}

export type { ActorSetup, StageActor };
