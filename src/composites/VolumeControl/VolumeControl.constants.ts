/* @layer renderer-components @kind data */
const VOLUME_NUDGE_SHARE = 0.05;

const VOLUME_KEY_DIRECTIONS: Readonly<Record<string, 1 | -1>> = {
  ArrowUp: 1,
  ArrowRight: 1,
  ArrowDown: -1,
  ArrowLeft: -1,
};

export { VOLUME_KEY_DIRECTIONS, VOLUME_NUDGE_SHARE };
