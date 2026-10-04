/* @layer renderer-components @kind logic */
import type { PartPose } from './sample.type';

const restPose = (opacity: number): PartPose => ({ x: 0, y: 0, rotate: 0, scaleX: 1, scaleY: 1, opacity });

export { restPose };
