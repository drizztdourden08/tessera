/* @layer renderer-components @kind logic */
import { BRAND_FAMILY } from '../../family.constants';
import type { BrandApp } from '../../brand.type';
import { BAR_BOTTOM } from '../TesseraLogo.constants';
import type { Point, TileSpot } from '../TesseraLogo.type';

const pointsOf = (d: string): Point[] => {
  const n = (d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
  return n.filter((_, i) => i % 2 === 0).map((x, i) => ({ x, y: n[i * 2 + 1] ?? 0 }));
};

const centreOf = (d: string): Point => {
  const xs = pointsOf(d).map((p) => p.x);
  const ys = pointsOf(d).map((p) => p.y);
  return { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 };
};

const stemCentre = (): number => {
  const xs = BRAND_FAMILY.tessera.mark.paths
    .flatMap((p) => pointsOf(p.d))
    .filter((p) => p.y > BAR_BOTTOM)
    .map((p) => p.x);
  return (Math.min(...xs) + Math.max(...xs)) / 2;
};

const tileSpots = (): TileSpot[] => {
  const stem = stemCentre();
  return BRAND_FAMILY.tessera.mark.paths
    .filter((p) => p.group && p.group !== 'tessera')
    .map((p) => {
      const centre = centreOf(p.d);
      return { app: p.group as BrandApp, centre, side: centre.x < stem ? 'left' : 'right' };
    });
};

export { tileSpots };
