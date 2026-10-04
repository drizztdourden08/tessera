/* @layer renderer-components @kind types */
import type { MascotStep, StepResult } from '../MascotStage.type';

interface StepRunner {
  /** Runs a step now, interrupting the current one (or waiting out a protected moment) and clearing the queue. */
  command: (step: MascotStep, priority: number, host: boolean, now: number) => Promise<StepResult>;
  /** Adds steps after everything already queued. */
  enqueue: (steps: readonly MascotStep[], priority: number, host: boolean, now: number) => Promise<StepResult>;
  tick: (now: number, dt: number) => void;
  stop: (now: number) => void;
  idle: () => boolean;
}

export type { StepRunner };
