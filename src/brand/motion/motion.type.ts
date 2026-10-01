/* @layer renderer-components @kind types */
import type { BrandPiece, ScenePoint } from '../brand.type';

interface MotionFrame {
  at: number;
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  opacity?: number;
  ease?: string;
}

interface MotionTrack {
  part: string;
  frames: readonly MotionFrame[];
}

interface MascotAnimation {
  name: string;
  summary: string;
  duration: number;
  loop: boolean;
  tracks: readonly MotionTrack[];
}

interface MotionPart {
  id: string;
  node: string;
  pivot: ScenePoint;
}

interface MotionStage {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface MotionShadow {
  piece: BrandPiece;
  at: ScenePoint;
}

interface MascotMotion<N extends string = string> {
  stage: MotionStage;
  pivot: ScenePoint;
  parts: readonly MotionPart[];
  shadow?: MotionShadow;
  rest: N;
  animations: Readonly<Record<N, MascotAnimation>>;
}

export type { MascotAnimation, MascotMotion, MotionFrame, MotionPart, MotionShadow, MotionStage, MotionTrack };
