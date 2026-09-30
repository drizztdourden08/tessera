/* @layer renderer-components @kind types */
import type { PixelWordmarkColors } from '../composites/PixelWordmark';

type BrandApp = 'tessera' | 'brock' | 'archipelia' | 'rotp';

interface BrandMarkPath {
  d: string;
  ink: string;
  group?: BrandApp;
  evenOdd?: boolean;
  opacity?: number;
}

interface BrandMarkData {
  viewBox: string;
  paths: readonly BrandMarkPath[];
  pixelArt?: boolean;
}

type BrandGradientStops = readonly [from: string, to: string] | readonly [from: string, via: string, to: string];

interface BrandGradient {
  angle: number;
  stops: BrandGradientStops;
}

interface BrandWordmarkSpec {
  text: string;
  colors: PixelWordmarkColors;
}

type BrandAppIcon = 'straight' | 'tile';

type ScenePoint = readonly [x: number, y: number];

interface BrandPiece {
  name: string;
  w: number;
  h: number;
  paths: readonly BrandMarkPath[];
}

interface SceneTurn {
  left: number;
  top: number;
  angle: number;
  originX: number;
  originY: number;
}

interface ScenePieceNode extends SceneTurn {
  kind: 'piece';
  label: string;
  piece: BrandPiece;
  width: number;
  height: number;
}

interface SceneGroupNode {
  kind: 'group';
  label: string;
  turn?: SceneTurn;
  clip?: readonly ScenePoint[];
  children: readonly SceneNode[];
}

type SceneNode = ScenePieceNode | SceneGroupNode;

interface BrandSceneData {
  width: number;
  height: number;
  nodes: readonly SceneNode[];
}

interface MascotPose {
  look?: ScenePoint;
  podAngles?: { readonly left?: number; readonly right?: number };
}

interface BrandMascotVariant {
  id: string;
  name: string;
  summary: string;
  pieces: readonly BrandPiece[];
  compose: (pose?: MascotPose) => BrandSceneData;
}

interface BrandMascot {
  name: string;
  summary: string;
  variants: readonly [BrandMascotVariant, ...BrandMascotVariant[]];
}

interface BrandInfo {
  id: BrandApp;
  name: string;
  kind: string;
  colour: string;
  colourName: string;
  tile: string;
  appIcon: BrandAppIcon | null;
  summary: string;
  placement: string;
  mark: BrandMarkData;
  mascot?: BrandMascot;
  wordmark: BrandWordmarkSpec;
  gradient: BrandGradient;
}

export type {
  BrandApp, BrandAppIcon, BrandGradient, BrandGradientStops, BrandInfo, BrandMarkData, BrandMarkPath, BrandMascot,
  BrandMascotVariant, BrandPiece, BrandSceneData, BrandWordmarkSpec, MascotPose, SceneGroupNode, SceneNode, ScenePieceNode,
  ScenePoint, SceneTurn,
};
