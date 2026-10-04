/* @layer renderer-components @kind types */
import type { ScenePoint } from '../brand.type';

type Oval = readonly [x: number, y: number, rx: number, ry?: number];

type PathStep =
  | readonly [cmd: 'M' | 'L', x: number, y: number]
  | readonly [cmd: 'Q', cx: number, cy: number, x: number, y: number]
  | readonly [cmd: 'A', rx: number, ry: number, large: 0 | 1, sweep: 0 | 1, x: number, y: number]
  | readonly [cmd: 'Z'];

type SymbolShape = readonly PathStep[] | Oval;

type ConfettiBit = readonly [x: number, y: number, size: number, degrees: number];

interface RaySpan {
  from: number;
  to: number;
  width: number;
}

interface SymbolLayer {
  ink: string;
  opacity?: number;
  shift?: ScenePoint;
  evenOdd?: boolean;
  shapes: readonly SymbolShape[];
}

interface SymbolSpec {
  name: string;
  w: number;
  h: number;
  layers: readonly SymbolLayer[];
}

export type { ConfettiBit, PathStep, RaySpan, SymbolLayer, SymbolShape, SymbolSpec };
