/* @layer renderer-components @kind types */
interface StepperPositionText {
  stepOf: (step: number, total: number) => string;
  complete: string;
  notStarted: string;
}

export type { StepperPositionText };
