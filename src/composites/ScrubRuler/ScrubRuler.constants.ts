/* @layer renderer-components @kind data */
const SCRUB_TICK_GAP = 28;

const SCRUB_PAGE_STEP = 10;

const SCRUB_MARKER_DIRECTION: Readonly<Record<string, number>> = { ArrowLeft: -1, ArrowRight: 1 };

const SCRUB_KEY_STEPS: Readonly<Record<string, number>> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  PageUp: -SCRUB_PAGE_STEP,
  PageDown: SCRUB_PAGE_STEP,
};

export { SCRUB_KEY_STEPS, SCRUB_MARKER_DIRECTION, SCRUB_TICK_GAP };
