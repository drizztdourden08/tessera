/* @layer renderer-components @kind constants */
const RAMP_INDEX_ATTRIBUTE = 'data-ramp-index';

const STEP_MENU_GROUP_ID = 'step';

const RAMP_STEPS: Readonly<Record<string, number>> = { ArrowRight: 1, ArrowLeft: -1 };

export { RAMP_INDEX_ATTRIBUTE, RAMP_STEPS, STEP_MENU_GROUP_ID };
