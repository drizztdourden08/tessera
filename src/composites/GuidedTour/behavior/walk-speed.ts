/* @layer renderer-components @kind logic */
import { MASCOT_SPEED, MASCOT_WALK_S } from '../GuidedTour.constants';

const walkSpeed = (from: number, to: number): number => Math.max(MASCOT_SPEED, Math.abs(to - from) / MASCOT_WALK_S);

export { walkSpeed };
