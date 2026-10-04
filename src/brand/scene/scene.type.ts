/* @layer renderer-components @kind types */
import type { SceneTurn, ScenePoint } from '../brand.type';

interface PieceSpot {
  at: ScenePoint;
  scale?: number;
  angle?: number;
  origin?: ScenePoint;
  label?: string;
}

interface GroupSpot {
  turn?: SceneTurn;
  clip?: readonly ScenePoint[];
  part?: string;
}

interface SceneWriter {
  ink: (ink: string) => string;
  crisp: boolean;
  clipId: () => string;
}

interface SceneMarkupOptions {
  idPrefix?: string;
  ink?: (ink: string) => string;
}

export type { GroupSpot, PieceSpot, SceneMarkupOptions, SceneWriter };
