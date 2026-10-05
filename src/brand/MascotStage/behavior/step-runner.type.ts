/* @layer renderer-components @kind types */
import type { MascotStep, MascotStepResult } from '../MascotStage.type';

interface StepRunner {
  command: (step: MascotStep, priority: number, host: boolean, now: number) => Promise<MascotStepResult>;
  enqueue: (steps: readonly MascotStep[], priority: number, host: boolean, now: number) => Promise<MascotStepResult>;
  tick: (now: number, dt: number) => void;
  stop: (now: number) => void;
  idle: () => boolean;
}

export type { StepRunner };
