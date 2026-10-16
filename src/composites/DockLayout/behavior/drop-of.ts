/* @layer renderer-components @kind logic */
import type { DockDrop, DropTarget, PaneNode } from '../DockLayout.type';
import type { LaidOut } from './layout-tree.type';

const paneIn = (laid: LaidOut | null, key: string): PaneNode | null => {
  const node = laid?.leaves.find((l) => l.node.key === key)?.node;
  return node?.kind === 'pane' ? node : null;
};

const dropOf = (target: DropTarget, laid: LaidOut | null): DockDrop => {
  if (target.at === 'float') return { kind: 'float', slot: 'main', pane: null, edge: null };
  if (target.at === 'outer') return { kind: 'split', slot: 'stage', pane: null, edge: target.edge };
  const pane = paneIn(laid, target.key);
  if (target.at === 'tab') return { kind: 'tab', slot: 'pane', pane, edge: null };
  return { kind: 'split', slot: pane ? 'pane' : 'main', pane, edge: target.edge };
};

export { dropOf };
