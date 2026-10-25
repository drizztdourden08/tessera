/* @layer renderer-components @kind data */
const STEPPER_STRINGS = {
  steps: 'Steps',
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  stepName: (step: number, label: string) => `${label}, step ${step}`,
  stepDone: (step: number, label: string) => `${label}, step ${step}, done`,
  stepError: (step: number, label: string) => `${label}, step ${step}, needs attention`,
  changedCount: (count: number) => `${count} changed`,
};

export { STEPPER_STRINGS };
