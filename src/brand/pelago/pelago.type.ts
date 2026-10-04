/* @layer renderer-components @kind types */
import type { ScenePoint } from '../brand.type';

interface SphereRig {
  at: ScenePoint;
  glint: ScenePoint;
}

interface FloatingHandRig {
  at: ScenePoint;
  pivot: ScenePoint;
}

interface PelagoRig {
  width: number;
  height: number;
  goo: number;
  spheres: Readonly<Record<'top' | 'left' | 'right', SphereRig>>;
  glintAngle: number;
  eyes: readonly ScenePoint[];
  handLeft: FloatingHandRig;
  handRight: FloatingHandRig;
  lookReach: ScenePoint;
}

type SphereTones = readonly [base: string, middle: string, light: string];

type Oval = readonly [x: number, y: number, rx: number, ry?: number];

type PelagoPieceName = 'sphereTop' | 'sphereLeft' | 'sphereRight' | 'glint' | 'eye' | 'handLeft' | 'handRight';

export type { Oval, PelagoPieceName, PelagoRig, SphereTones };
