/* @layer renderer-components @kind types */
import type { ScenePieceNode, ScenePoint } from '../brand.type';

type HookshotCurve = readonly [start: ScenePoint, pull: ScenePoint, push: ScenePoint, end: ScenePoint];

interface HookshotLayout {
  links: ScenePieceNode[];
  handle: ScenePieceNode;
  head: ScenePieceNode;
  tip: ScenePoint;
}

interface HookshotRig {
  handle: { grip: ScenePoint; muzzle: ScenePoint };
  linkFace: { pinA: ScenePoint; pinB: ScenePoint };
  linkEdge: { pinA: ScenePoint; pinB: ScenePoint };
  head: { back: ScenePoint; tip: ScenePoint };
}

interface ChainCursor {
  point: ScenePoint;
  segment: number;
}

interface BagEffects {
  stars: ScenePieceNode[];
  speedLines: ScenePieceNode[];
}

interface SpeedLineSpot {
  from: ScenePoint;
  spread: number;
}

interface HookshopRig {
  sentri: { at: ScenePoint; angle: number; pod: ScenePoint };
  hookshot: { angle: number; length: number; bend: number };
  bag: { scale: number; angle: number; catch: ScenePoint; stampCentre: ScenePoint; stampAngle: number; frontEdge: readonly [ScenePoint, ScenePoint] };
  stampScale: number;
  stars: readonly ScenePoint[];
  speedLines: readonly SpeedLineSpot[];
  sparkleNudge: ScenePoint;
  height: number;
  margin: number;
}

export type { BagEffects, ChainCursor, HookshopRig, HookshotCurve, HookshotLayout, HookshotRig };
