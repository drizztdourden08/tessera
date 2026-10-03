/* @layer renderer-components @kind data */
const STEPPER_STRINGS = {
  steps: 'Steps',
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  stepName: (step: number, label: string) => `Step ${step}, ${label}`,
  stepDone: (step: number, label: string) => `Step ${step}, ${label}, done`,
  stepError: (step: number, label: string) => `Step ${step}, ${label}, needs attention`,
  sections: (label: string) => `${label} sections`,
  changedCount: (count: number) => `${count} changed`,
};

export { STEPPER_STRINGS };
