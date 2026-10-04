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
  lag?: number;
  frames: readonly MotionFrame[];
}

interface MascotAnimation {
  name: string;
  summary: string;
  duration: number;
  loop: boolean;
  tracks: readonly MotionTrack[];
  still?: readonly string[];
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

interface MotionEffect {
  id: string;
  piece: BrandPiece;
  at: ScenePoint;
  fixed?: boolean;
}

interface MascotMotion<N extends string = string> {
  stage: MotionStage;
  pivot: ScenePoint;
  parts: readonly MotionPart[];
  shadow?: MotionShadow;
  effects?: readonly MotionEffect[];
  rest: N;
  animations: Readonly<Record<N, MascotAnimation>>;
  ambient?: MascotAnimation;
}

export type { MascotAnimation, MascotMotion, MotionEffect, MotionFrame, MotionPart, MotionShadow, MotionStage, MotionTrack };
