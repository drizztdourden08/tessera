/* @layer renderer-components @kind types */
import type { ActorCore } from './actor.type';
import type { MascotAutonomyConfig } from './autonomy.type';
import type { StepRunner } from './step-runner.type';

interface HandleParts {
  core: ActorCore;
  runner: StepRunner;
  now: () => number;
  autonomy: (config: boolean | MascotAutonomyConfig) => void;
}

export type { HandleParts };
