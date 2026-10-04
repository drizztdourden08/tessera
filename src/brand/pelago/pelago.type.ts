/* @layer renderer-components @kind types */
import type { BrandPiece, ScenePoint } from '../brand.type';

type IsletId = 'a' | 'b' | 'c' | 'd';

type ThreadEnd = IsletId | 'core';

type Polygon = readonly ScenePoint[];

type Oval = readonly [x: number, y: number, rx: number, ry?: number];

interface FacetLayer {
  ink: string;
  opacity?: number;
  polygons?: readonly Polygon[];
  ovals?: readonly Oval[];
  grow?: number;
}

interface FacetSpot {
  at: ScenePoint;
  size?: number;
  mirror?: boolean;
}

interface PlacedPiece {
  piece: BrandPiece;
  at: ScenePoint;
}

interface ThreadRig {
  id: string;
  from: ThreadEnd;
  to: IsletId;
  bulge: number;
  orbit: boolean;
}

interface IsletRig {
  node: ScenePoint;
  mirror: boolean;
  size: number;
}

interface PelagoRig {
  width: number;
  height: number;
  core: ScenePoint;
  eyes: readonly ScenePoint[];
  lookReach: ScenePoint;
  islets: Readonly<Record<IsletId, IsletRig>>;
  threads: readonly ThreadRig[];
  pebbles: readonly [ScenePoint, ScenePoint, ScenePoint];
  orbit: { perDegree: number; reach: number };
}

interface IsletMove {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
}

interface IsletBeat {
  at: number;
  ease?: string;
  moves?: Partial<Record<IsletId, IsletMove>>;
}

type PelagoPieceName = 'aura' | 'rock' | 'halo' | 'crystal' | 'eye' | 'spark' | 'pebbleA' | 'pebbleB' | 'pebbleC';

export type { FacetLayer, FacetSpot, IsletBeat, IsletId, IsletMove, PelagoPieceName, PelagoRig, PlacedPiece, Polygon, ThreadEnd, ThreadRig };
