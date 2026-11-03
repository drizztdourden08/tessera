/* @layer renderer-components @kind logic */
import { cellAt, nearestBorder } from '../../cell-geometry';
import type { CellGeometry } from '../../cell-geometry';
import type { RulerMarkerAnchor } from '../ScrubRuler.type';

const markerIndexAt = (cells: CellGeometry, x: number, total: number, anchor: RulerMarkerAnchor | undefined): number =>
  (anchor === 'edge' ? nearestBorder(cells, x, total) : cellAt(cells, x, total));

export { markerIndexAt };
