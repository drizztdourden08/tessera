/* @layer renderer-components @kind types */
import type { BrandApp } from '../brand.type';

interface InteractiveTesseraProps {
  selected?: BrandApp | null;
  defaultSelected?: BrandApp | null;
  onSelect?: (app: BrandApp | null) => void;
  className?: string;
}

type Side = 'left' | 'right';

interface Point {
  x: number;
  y: number;
}

interface TileSpot {
  app: BrandApp;
  centre: Point;
  side: Side;
}

export type { Point, Side, InteractiveTesseraProps, TileSpot };
