/* @layer renderer-components @kind logic */
import { facetPiece } from './facet-piece';
import { movePolygon } from './move-polygon';
import type { FacetLayer, FacetSpot, PlacedPiece } from './pelago.type';
import { MIRRORED_TONES } from './pelago-geometry.constants';
import { PELAGO_TONES } from './pelago-tones.constants';

const toneOf = (key: string, mirror: boolean): string => {
  const name = mirror ? MIRRORED_TONES[key] ?? key : key;
  return name in PELAGO_TONES ? PELAGO_TONES[name as keyof typeof PELAGO_TONES] : name;
};

const placedFacets = (name: string, layers: readonly FacetLayer[], spot: FacetSpot): PlacedPiece => {
  const { at, size = 1, mirror = false } = spot;
  return facetPiece(name, layers.map((layer) => ({
    ...layer,
    ink: toneOf(layer.ink, mirror),
    ...(layer.grow === undefined ? {} : { grow: layer.grow * size }),
    ...(layer.polygons ? { polygons: layer.polygons.map((p) => movePolygon(p, at, size, mirror)) } : {}),
    ...(layer.ovals ? { ovals: layer.ovals.map(([x, y, rx, ry = rx]) => [at[0] + (mirror ? -x : x) * size, at[1] + y * size, rx * size, ry * size] as const) } : {}),
  })));
};

export { placedFacets };
