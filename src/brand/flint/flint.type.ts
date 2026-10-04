/* @layer renderer-components @kind types */
import type { ScenePoint } from '../brand.type';

interface HandRig {
  at: ScenePoint;
  shoulder: ScenePoint;
}

interface FlintRig {
  size: ScenePoint;
  body: ScenePoint;
  eyes: readonly ScenePoint[];
  mouth: ScenePoint;
  handLeft: HandRig;
  handRight: HandRig;
  lookReach: ScenePoint;
}

export type { FlintRig };
