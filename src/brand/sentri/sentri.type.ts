/* @layer renderer-components @kind types */
import type { ScenePoint } from '../brand.type';

interface PodRig {
  at: ScenePoint;
  pivot: ScenePoint;
}

interface SentriRig {
  body: ScenePoint;
  visor: ScenePoint;
  eyes: readonly ScenePoint[];
  podLeft: PodRig;
  podRight: PodRig;
  lookReach: ScenePoint;
}

export type { SentriRig };
