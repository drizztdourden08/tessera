/* @layer renderer-components @kind logic */
import { COMPASS, COMPASS_STEPS, EDGES, OUTER_STRIP, SHARE } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import { alongEdge } from './along-edge';
import type { DragSubject, DropZone } from './drag.type';
import { edgeBand } from './edge-band';
import { isOwnEmptyingPane } from './is-own-emptying-pane';
import type { LaidOut, LeafRect } from './layout-tree.type';

const outerZones = (stage: Rect, isMain: boolean): DropZone[] => {
  const share = isMain ? SHARE.outerMain : SHARE.outerPane;
  return EDGES.map((edge) => ({
    target: { at: 'outer', edge },
    hit: edgeBand(stage, edge, OUTER_STRIP),
    preview: edgeBand(stage, edge, alongEdge(stage, edge) * share),
    kind: 'outer',
  }));
};

const leafZones = (leaf: LeafRect, subject: DragSubject): DropZone[] => {
  const { node, rect } = leaf;
  const cx = rect.x + rect.width / 2 - COMPASS / 2;
  const cy = rect.y + rect.height / 2 - COMPASS / 2;
  const at = (dx: number, dy: number): Rect => ({ x: cx + dx, y: cy + dy, width: COMPASS, height: COMPASS });
  const zones: DropZone[] = EDGES.map((edge) => ({
    target: { at: 'leaf', key: node.key, edge },
    hit: at(...COMPASS_STEPS[edge]),
    preview: edgeBand(rect, edge, alongEdge(rect, edge) / 2),
    kind: 'compass',
  }));
  if (subject.isMain) return zones;
  if (node.kind === 'pane') zones.push({ target: { at: 'tab', key: node.key }, hit: at(0, 0), preview: rect, kind: 'compass' });
  if (node.kind === 'main') zones.push({ target: { at: 'float' }, hit: rect, preview: null, kind: 'float' });
  return zones;
};

const dropZones = (laid: LaidOut, stage: Rect, subject: DragSubject): DropZone[] => [
  ...outerZones(stage, subject.isMain),
  ...laid.leaves.filter((leaf) => !isOwnEmptyingPane(leaf.node.key, subject)).flatMap((leaf) => leafZones(leaf, subject)),
];

export { dropZones };
