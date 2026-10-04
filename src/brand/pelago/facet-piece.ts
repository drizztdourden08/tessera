/* @layer renderer-components @kind logic */
import type { BrandMarkPath, ScenePoint } from '../brand.type';
import { growPolygon } from './grow-polygon';
import { ovalPath } from './oval-path';
import type { FacetLayer, PlacedPiece, Polygon } from './pelago.type';
import { pieceBounds } from './piece-bounds';
import { polygonPath } from './polygon-path';

const shapesOf = (layer: FacetLayer): readonly Polygon[] =>
  (layer.grow === undefined ? layer.polygons ?? [] : (layer.polygons ?? []).map((p) => growPolygon(p, layer.grow ?? 0)));

const cornersOf = (layer: FacetLayer): ScenePoint[] => [
  ...shapesOf(layer).flat(),
  ...(layer.ovals ?? []).flatMap(([x, y, rx, ry = rx]): ScenePoint[] => [[x - rx, y - ry], [x + rx, y + ry]]),
];

const layerPath = (layer: FacetLayer, origin: ScenePoint): BrandMarkPath => {
  const ovals = (layer.ovals ?? []).map(([x, y, rx, ry = rx]) => ovalPath([x - origin[0], y - origin[1]], rx, ry));
  const d = polygonPath(shapesOf(layer), origin) + ovals.join('');
  return layer.opacity === undefined ? { ink: layer.ink, d } : { ink: layer.ink, opacity: layer.opacity, d };
};

const facetPiece = (name: string, layers: readonly FacetLayer[]): PlacedPiece => {
  const { at, w, h } = pieceBounds(layers.flatMap(cornersOf));
  return { at, piece: { name, w, h, paths: layers.map((layer) => layerPath(layer, at)) } };
};

export { facetPiece };
