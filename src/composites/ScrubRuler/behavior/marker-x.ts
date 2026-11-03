/* @layer renderer-components @kind logic */
import { borderX } from '../../cell-geometry';
import type { CellGeometry } from '../../cell-geometry';
import type { RulerMarkerAnchor } from '../ScrubRuler.type';

const markerX = (cells: CellGeometry, index: number, total: number, anchor: RulerMarkerAnchor | undefined): number => {
  if (anchor === 'edge') return borderX(cells, index, total);
  return (cells.lefts[index] ?? 0) + (cells.widths[index] ?? 0) / 2;
};

export { markerX };
