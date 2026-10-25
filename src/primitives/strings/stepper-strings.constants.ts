/* @layer renderer-components @kind data */
const STEPPER_STRINGS = {
  steps: 'Steps',
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  done: 'Done',
  needsAttention: 'Needs attention',
  changedCount: (count: number) => `${count} changed`,
};

export { STEPPER_STRINGS };
