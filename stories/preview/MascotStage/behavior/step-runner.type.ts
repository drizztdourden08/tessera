/* @layer stories @kind types */
import type { MascotStep, StepResult } from '../MascotStage.type';

interface StepRunner {
  command: (step: MascotStep, priority: number, host: boolean, now: number) => Promise<StepResult>;
  enqueue: (steps: readonly MascotStep[], priority: number, host: boolean, now: number) => Promise<StepResult>;
  tick: (now: number, dt: number) => void;
  stop: (now: number) => void;
  idle: () => boolean;
}

export type { StepRunner };
