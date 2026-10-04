/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../../brand.type';
import type { PartPose } from './sample.type';

const poseTransform = (pose: PartPose, [px, py]: ScenePoint): string =>
  `translate(${px + pose.x}px, ${py + pose.y}px) rotate(${pose.rotate}deg) scale(${pose.scaleX}, ${pose.scaleY}) translate(${-px}px, ${-py}px)`;

export { poseTransform };
