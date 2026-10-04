/* @layer renderer-components @kind constants */
/** Stage height in pixels when none is given. */
const STAGE_HEIGHT = 160;

/** Default walking speed in stage pixels per second. */
const WALK_SPEED = 110;

/** Acceleration as a multiple of top speed per second: a quarter second to reach full speed. */
const ACCEL_PER_SPEED = 4;

/** Close enough to stand on the target, in pixels. */
const ARRIVE_PX = 0.75;

/** The longest frame step the engine integrates, in seconds, so a background tab does not teleport. */
const MAX_STEP_S = 0.05;

export { ACCEL_PER_SPEED, ARRIVE_PX, MAX_STEP_S, STAGE_HEIGHT, WALK_SPEED };
